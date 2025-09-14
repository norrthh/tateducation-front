// /store/useLessonStore.ts
import { create } from 'zustand';

// /types/lesson.ts
export type CategoryKey =
    | 'grammar'
    | 'listening'
    | 'writing'
    | (string & {}); // на случай новых категорий с бэка

export interface LessonDTO {
    id: number;
    name: string;
    image: string;
}

export interface UserLessonsCategory {
    exists: boolean;
    score: number | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface SubLessonDTO {
    id: number;
    name: string;
    percent: number;     // 0..100
    passed: boolean;
    category: CategoryKey;
    user_lessons_category: UserLessonsCategory;
}

export interface UnpassedItem {
    id: number;
    name: string;
}

export interface ProgressOverall {
    percent: number;     // 0..100
    passed: boolean;
}

export interface CategoryProgress {
    label: string;
    percent: number;     // 0..100
    passed: boolean;
}

export type ProgressByCategory = Record<CategoryKey, CategoryProgress>;

export interface LessonProgress {
    overall: ProgressOverall;
    by_category: ProgressByCategory;
}

export interface LessonPageData {
    lesson: LessonDTO;
    sub_lessons: SubLessonDTO[];
    unpassed_list: UnpassedItem[];
    next_unpassed: UnpassedItem | null;
    progress: LessonProgress;
}


type LessonState = {
    data: LessonPageData | null;
    loading: boolean;
    error: string | null;

    // setters
    setData: (payload: LessonPageData) => void;
    setLoading: (v: boolean) => void;
    setError: (msg: string | null) => void;

    // updates
    patchSubLesson: (id: number, patch: Partial<SubLessonDTO>) => void;
    markPassed: (id: number) => void;

    // recompute helpers (на случай локальных правок)
    recomputeDerived: () => void;

    // selectors
    getNextUnpassed: () => UnpassedItem | null;
};

function computeByCategory(sub_lessons: SubLessonDTO[]): Record<CategoryKey, CategoryProgress> {
    const buckets = new Map<CategoryKey, { label: string; total: number; count: number; allPassed: boolean }>();

    for (const s of sub_lessons) {
        const prev = buckets.get(s.category) ?? {
            label: labelFromCategory(s.category),
            total: 0,
            count: 0,
            allPassed: true,
        };
        prev.total += s.percent;
        prev.count += 1;
        if (!s.passed) prev.allPassed = false;
        buckets.set(s.category, prev);
    }

    const result: Record<string, CategoryProgress> = {};
    for (const [key, v] of buckets.entries()) {
        result[key] = {
            label: v.label,
            percent: v.count ? Math.round(v.total / v.count) : 0,
            passed: v.allPassed && v.count > 0,
        };
    }
    return result as Record<CategoryKey, CategoryProgress>;
}

function labelFromCategory(cat: CategoryKey): string {
    switch (cat) {
        case 'grammar':
            return 'Грамматика';
        case 'listening':
            return 'Аудирование';
        case 'writing':
            return 'Письмо';
        default:
            // дефолт для новых категорий
            return String(cat);
    }
}

function computeOverall(sub_lessons: SubLessonDTO[]): { percent: number; passed: boolean } {
    if (sub_lessons.length === 0) return { percent: 0, passed: false };
    const avg = Math.round(sub_lessons.reduce((a, s) => a + s.percent, 0) / sub_lessons.length);
    const passed = sub_lessons.every((s) => s.passed);
    return { percent: avg, passed };
}

function computeUnpassed(sub_lessons: SubLessonDTO[]): { list: UnpassedItem[]; next: UnpassedItem | null } {
    const list = sub_lessons
        .filter((s) => !s.passed)
        .map<UnpassedItem>((s) => ({ id: s.id, name: s.name }));
    return { list, next: list[0] ?? null };
}

export const useLessonStore = create<LessonState>((set, get) => ({
    data: null,
    loading: false,
    error: null,

    setData: (payload) => {
        // Принимаем серверный объект как есть,
        // но подстраховываем derived-поля, если захотите пересчитать локально
        set({ data: payload, error: null });
    },

    setLoading: (v) => set({ loading: v }),
    setError: (msg) => set({ error: msg }),

    patchSubLesson: (id, patch) => {
        const state = get().data;
        if (!state) return;

        const sub_lessons = state.sub_lessons.map((s) => (s.id === id ? { ...s, ...patch } : s));

        // пересчет зависимых полей, чтобы не ждать бэка
        const by_category = computeByCategory(sub_lessons);
        const overall = computeOverall(sub_lessons);
        const { list, next } = computeUnpassed(sub_lessons);

        const progress: LessonProgress = {
            by_category: { ...state.progress.by_category, ...by_category },
            overall,
        };

        set({
            data: {
                ...state,
                sub_lessons,
                unpassed_list: list,
                next_unpassed: next,
                progress,
            },
        });
    },

    markPassed: (id) => {
        const s = get().data?.sub_lessons.find((x) => x.id === id);
        if (!s) return;
        get().patchSubLesson(id, { passed: true, percent: 100 });
    },

    recomputeDerived: () => {
        const state = get().data;
        if (!state) return;

        const by_category = computeByCategory(state.sub_lessons);
        const overall = computeOverall(state.sub_lessons);
        const { list, next } = computeUnpassed(state.sub_lessons);

        set({
            data: {
                ...state,
                unpassed_list: list,
                next_unpassed: next,
                progress: {
                    by_category: { ...state.progress.by_category, ...by_category },
                    overall,
                },
            },
        });
    },

    getNextUnpassed: () => get().data?.next_unpassed ?? null,
}));
