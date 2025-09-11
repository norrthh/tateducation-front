"use client";

import {createContext, useContext, useEffect, useMemo, useState} from "react";
import ru from "@/locales/ru/common.json";
import tt from "@/locales/tt/common.json";

type Lang = "ru" | "tt";
// допускаем вложенность
type Dict = Record<string, unknown>;
const DICTS: Record<Lang, Dict> = { ru, tt };

function getByPath(obj: unknown, path: string): unknown {
    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

type I18nContextType = {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: string) => string;
};
const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("ru");

    useEffect(() => {
        const saved = localStorage.getItem("lang") as Lang | null;
        if (saved === "ru" || saved === "tt") setLang(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    const t = useMemo(() => {
        const dict = DICTS[lang] ?? {};
        return (key: string) => {
            const v = getByPath(dict, key);
            return typeof v === "string" ? v : key; // если не строка или нет — вернуть ключ
        };
    }, [lang]);

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
    return ctx;
}
