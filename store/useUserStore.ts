
import {create} from 'zustand';

export interface User {
    id: number,
    telegram_id: number,
    avatar: string,
    full_name: string,
    username: string,
    ton_address: string,
    is_verified: boolean,
    pacman: {
        coin: number
    },
    coin: number | null,
    digger: {
        coin: number
    }
}
interface useUserStore {
    user: User;
    userTop: User[];
    userTop2: User[];
    setUser: (user: User) => void;
    setUserTop: (userTop: User[]) => void; // Принимает массив User
    setUserTop2: (userTop2: User[]) => void;
    bearerToken: string,
    setBearerToken: (bearerToken: string) => void,
}

const useUserStore = create<useUserStore>((set) => ({
    user: {
        id: 0,
        telegram_id: 0,
        avatar: '',
        full_name: '',
        username: '',
        is_verified: false,
        ton_address: '',
        pacman: {
            coin: 0
        },
        coin: 0,
        digger: {
            coin: 0
        }
    },
    userTop: [],
    userTop2: [],
    setUser: (user) => set({ user }),
    setUserTop: (userTop) => set({ userTop }), // Устанавливает массив User
    setUserTop2: (userTop2) => set({ userTop2 }),
    bearerToken: '',
    setBearerToken: (bearerToken) => set({ bearerToken }),
}));


export default useUserStore;