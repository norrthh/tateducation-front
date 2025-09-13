'use client'
import { notFound } from 'next/navigation';
import useSiteStore from '@/store/useSiteStore';
import { use, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

type RouteParams = { id: string; childId: string };
type Task =
    | { id: string; type: 'input'; ru: string; answers: string[]; tt_hint?: string }
    | { id: string; type: 'choice'; ru: string; tt?: string; options: string[]; correctIndex: number }
    | { id: string; type: 'audio_choice'; ru: string; audio: string; options: string[]; correctIndex: number };

const tasks: Task[] = [
    // INPUT: перевод RU → TT
    { id: 't1', type: 'input', ru: 'Привет',        answers: ['Сәлам', 'Сәлам!']},
    { id: 't2', type: 'input', ru: 'Здравствуйте',  answers: ['Исәнмесез', 'Исәнмесез!']},
    { id: 't3', type: 'input', ru: 'Спасибо',       answers: ['Рәхмәт', 'Рәхмәт!'] },
    { id: 't4', type: 'input', ru: 'Доброе утро',   answers: ['Хәерле иртә', 'Хәерле иртә!'] },
    { id: 't5', type: 'input', ru: 'Добрый день',   answers: ['Хәерле көн', 'Хәерле көн!'] },
    { id: 't6', type: 'input', ru: 'Добрый вечер',  answers: ['Хәерле кич', 'Хәерле кич!'] },
    { id: 't7', type: 'input', ru: 'Доброй ночи',   answers: ['Хәерле төн', 'Хәерле төн!'] },
    { id: 't8', type: 'input', ru: 'Да / Нет',      answers: ['Әйе / Юк', 'Әйе/Юк', 'Әйе - Юк'] },
    // Дополнительно: выбор / аудио
    { id: 't9',  type: 'choice',       ru: '«Хәерле иртә!»', options: ['Доброе утро', 'Спасибо', 'До свидания', 'Пожалуйста'], correctIndex: 0 },
    { id: 't11', type: 'choice',       ru: 'Выберите корректную форму с местным падежом (место): «… (в школе)»', tt: 'мәктәп__', options: ['мәктәпдә', 'мәктәпта', 'мәктәптә', 'мәктәпда'], correctIndex: 2 },
    { id: 't12', type: 'choice',       ru: 'Укажите правильную форму направления: «Еду в Казань»', tt: 'Казан__ барам', options: ['Казанга', 'Казангә', 'Казанка', 'Казанкә'], correctIndex: 0 },
];

// Индикатор шагов
function StepsIndicator({ total, current }: { total: number; current: number }) {
    return (
        <div className="mb-4 flex items-center justify-center gap-2">
            {Array.from({ length: total }, (_, i) => {
                const idx = i + 1;
                const base = 'relative h-[25px] w-[25px] rounded-4xl text-center';
                const num = 'absolute left-0 right-0 text-center text-sm font-bold ' + (idx <= current ? 'top-[2px]' : 'top-0');
                if (idx < current) {
                    return (
                        <div key={idx} className={`${base} bg-[var(--main)]`}>
                            <p className={`${num} text-white`}>{idx}</p>
                        </div>
                    );
                }
                if (idx === current) {
                    return (
                        <div key={idx} className={`${base} border-2 border-[var(--main)]`}>
                            <p className={`${num} text-white`}>{idx}</p>
                        </div>
                    );
                }
                return (
                    <div key={idx} className={`${base} border-2 border-[#9A9A9A]`}>
                        <p className={`${num} text-white`}>{idx}</p>
                    </div>
                );
            })}
        </div>
    );
}

// Страница
export default function Page({ params }: { params: Promise<RouteParams> }) {
    const { id, childId } = use(params);
    if (!/^\d+$/.test(id) || !/^\d+$/.test(childId)) notFound();
    const { setFooter } = useSiteStore();
    useEffect(() => { setFooter(false); }, [setFooter]);
    const [currentTask, setCurrentTask] = useState(1);
    const [results, setResults] = useState<Array<{taskId: string; isCorrect: boolean}>>([]);
    const task = tasks[currentTask - 1];
    const [inputValue, setInputValue] = useState('');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);

    useEffect(() => {
        setInputValue('');
        setSelectedIndex(null);
        setFeedback(null);
    }, [currentTask]);

    const softCyr = (s: string) =>
        s
            .replace(/ә/g, 'э')
            .replace(/ө/g, 'о')
            .replace(/ү/g, 'у')
            .replace(/ң/g, 'н')
            .replace(/һ/g, 'х')
            .replace(/җ/g, 'ж');

    const normalize = (s: string) =>
        softCyr(s.toLowerCase())
            .replace(/[!?.,–—\-\/]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

    const acceptableInput = useMemo(() => {
        if (task?.type !== 'input') return [];
        return task.answers.map((a) => normalize(a));
    }, [task]);

    const canProceed = useMemo(() => {
        if (!task) return false;
        if (task.type === 'input') return normalize(inputValue).length > 0;
        if (task.type === 'choice' || task.type === 'audio_choice') return selectedIndex !== null;
        return false;
    }, [task, inputValue, selectedIndex]);

    const isLast = currentTask === tasks.length;

    const checkAnswer = () => {
        if (!task) return;
        let isCorrect = false;
        if (task.type === 'input') {
            isCorrect = acceptableInput.includes(normalize(inputValue));
            setFeedback(isCorrect ? 'correct' : 'wrong');
        }
        if (task.type === 'choice' || task.type === 'audio_choice') {
            if (selectedIndex == null) {
                setFeedback('wrong');
                return;
            }
            isCorrect = selectedIndex === task.correctIndex;
            setFeedback(isCorrect ? 'correct' : 'wrong');
        }
        setResults(prev => [...prev, { taskId: task.id, isCorrect }]);
    };

    const goNext = () => {
        if (!isLast) {
            setCurrentTask((t) => t + 1);
        } else {
            setFeedback(null);
            const correctCount = results.filter(r => r.isCorrect).length;
            alert(`Тест завершён! Правильных ответов: ${correctCount} из ${results.length}`);
        }
    };

    const onCta = () => {
        if (feedback === 'correct') goNext();
        else checkAnswer();
    };

    const ctaClasses =
        `fixed bottom-[20px] w-[92%] rounded-lg p-3 font-bold transition-colors ` +
        (canProceed ? 'bg-[var(--main)] text-white' : 'bg-[#C5C5C5] text-[#595959]');

    return (
        <div className="relative pb-24">
            <button
                type="button"
                className="absolute left-3 top-3 z-10 rounded-lg border border-[#154734] bg-white px-3 py-1 text-sm font-semibold text-[#154734]"
                onClick={() => { window.location.href = '/'; }}
            >
                ← Назад
            </button>
            <h1 className="mb-2 pt-10 text-center text-lg font-bold uppercase text-white">Письмо</h1>
            <StepsIndicator total={tasks.length} current={currentTask} />

            {task?.type === 'input' && (
                <div className="flex flex-col gap-10">
                    <div className="flex items-center justify-center gap-1">
                        <Image src="/images/bars-speak.svg" alt="bars-speak.svg" width={76} height={95} />
                        <div
                            className="h-[56px] w-full max-w-[220px] bg-[url(/images/form_question.svg)] bg-contain bg-no-repeat"
                            style={{ padding: '7px 17px' }}
                        >
                            <p className="pt-2 text-center text-sm font-bold">
                                <span className="font-extrabold">{task.ru}</span>
                            </p>
                        </div>
                    </div>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`p-6 text-center text-sm font-bold ${
                            feedback === 'wrong'
                                ? 'border-[#C84D5C] text-[#C84D5C]'
                                : (feedback === 'correct' ? 'border-[#4DBF92] text-[#4DBF92]' : 'border-[#4DBF92] text-white')
                        }`}
                        placeholder={task.tt_hint || 'Введите перевод'}
                    />
                </div>
            )}

            {(task?.type === 'choice' || task?.type === 'audio_choice') && (
                <div className="flex flex-col gap-10">
                    <div className="flex items-center justify-center gap-1">
                        <Image src="/images/barsgovorit.svg" alt="barsgovorit.svg" width={76} height={95} />
                        <div
                            className={`bg-no-repeat ${task.type === 'audio_choice' ? 'h-[56px] bg-[url(/images/audio.svg)]' : ''}`}
                            style={{ padding: '7px 17px', width: 220 }}
                        >
                            <p className="text-sm font-bold">{task.ru}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        {'options' in task && task.options.map((opt, i) => {
                            const isSelected = selectedIndex === i;
                            const isCorrect = feedback && i === (task as any).correctIndex;
                            const isWrongSelected = feedback === 'wrong' && isSelected && i !== (task as any).correctIndex;
                            const base = 'rounded-lg p-3 text-center text-sm font-semibold transition';
                            const idle = isSelected ? 'bg-[#4DBF92] text-white' : 'border border-[#4DBF92]';
                            const afterCheck = isCorrect
                                ? 'bg-[#4DBF92] text-white'
                                : isWrongSelected
                                    ? 'border border-[#FF5A5A] text-[#FF5A5A]'
                                    : idle;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setSelectedIndex(i)}
                                    className={`${base} ${afterCheck}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <button
                className={ctaClasses}
                style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
                onClick={onCta}
                disabled={!canProceed}
            >
                {feedback === 'correct' ? (isLast ? 'Завершить' : 'Далее') : 'Проверить'}
            </button>

            {feedback && (
                <div className="fixed left-0 right-0 bottom-0 w-full rounded-t-2xl bg-[var(--main)] p-4 text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-4">
                            <h1 className="flex items-center gap-2 text-lg font-semibold">
                                <Image
                                    src={feedback === 'correct' ? '/images/successIcon.svg' : '/images/error.svg'}
                                    alt={feedback === 'correct' ? 'success' : 'error'}
                                    width={20}
                                    height={20}
                                />
                                {feedback === 'correct' ? 'Правильно!' : 'Неправильно!'}
                            </h1>
                            {(task as any)?.answers && (
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold">Правильный ответ:</p>
                                    <p className="text-sm font-semibold">{task?.type === 'input' ? (task as any).answers[0] : ''}</p>
                                </div>
                            )}
                            {(task as any)?.options && (
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold">Правильный ответ:</p>
                                    <p className="text-sm font-semibold">
                                        {task?.type === 'choice' ? (task as any).options[(task as any).correctIndex] : ''}
                                    </p>
                                </div>
                            )}
                        </div>
                        <Image
                            src={feedback === 'correct' ? '/images/barss.svg' : '/images/barsychitsya.svg'}
                            alt="bars"
                            width={95}
                            height={95}
                            className="ml-auto"
                        />
                    </div>
                    <button
                        className="mt-4 w-full rounded-lg bg-[#F8753C] p-2 text-sm font-semibold text-white"
                        onClick={() => goNext()}
                    >
                        {feedback === 'correct' ? (isLast ? 'Завершить' : 'Следующее задание') : 'Понял'}
                    </button>
                </div>
            )}
        </div>
    );
}
