import { create } from 'zustand';

interface telegramUser {
    added_to_attachment_menu?: boolean | undefined;
    allows_write_to_pm?: boolean | undefined;
    first_name: string | undefined;
    id: number | undefined;
    is_bot?: boolean | undefined;
    is_premium?: boolean | undefined;
    last_name?: string | undefined;
    language_code?: string | undefined;
    photo_url?: string | undefined;
    username?: string | undefined;
    lang?: string | undefined
}

interface TelegramInterfaceStore {
    telegramUser: telegramUser;
    setTelegramUser: (user: telegramUser) => void;
}

const useTelegramStore = create<TelegramInterfaceStore>((set) => ({
    telegramUser: {
        id: 0,
        first_name: '',
        last_name: '',
        username: '',
        is_premium: false,
        photo_url: '',
        lang: ''
    },
    setTelegramUser: (telegramUser) => set({ telegramUser }),
}));

export default useTelegramStore;