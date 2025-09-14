
import {create} from 'zustand';

export type UserLevel = 'junior' | 'middle' | 'senior';
export type UserLang = 'ru' | 'tt';

export interface TelegramUserDTO {
    id: number;
    telegram_id: string|number;
    telegram_photo_url: string;
    name: string;
    xp: number;
    status: number;           // при желании замени на enum
    lang: UserLang;
    level: UserLevel;
    goal: number;
    created_at: string;       // ISO-строка даты
    updated_at: string;       // ISO-строка даты
}

interface useUserStore {
    user: TelegramUserDTO;
    userTop: TelegramUserDTO[];
    setUser: (user: TelegramUserDTO) => void;
    setUserTop: (userTop: TelegramUserDTO[]) => void; // Принимает массив User
    bearerToken: string,
    setBearerToken: (bearerToken: string) => void,
}

const useUserStore = create<useUserStore>((set) => ({
    user: {
        id: 0,
        telegram_id: 0,
        telegram_photo_url: '',
        name: '',
        status: 0,
        lang: 'ru',
        level: 'junior',
        goal: 0,
        xp: 0,
        created_at: '',
        updated_at: ''
    },
    userTop: [],
    setUser: (user) => set({ user }),
    setUserTop: (userTop) => set({ userTop }), // Устанавливает массив User
    bearerToken: '',
    setBearerToken: (bearerToken) => set({ bearerToken }),
}));


export default useUserStore;