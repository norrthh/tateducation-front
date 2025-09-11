'use client'

import Image from "next/image";
import useTelegramStore from "@/store/useUserTelegram";
import useUserStore from "@/store/useUserStore";

const Header = () => {
    const {telegramUser} = useTelegramStore()
    const {user} = useUserStore()

    return (
        <header className="w-full justify-between items-start mb-2">
            <div className="flex gap-1 items-center">
                <Image
                    src={telegramUser.photo_url ?? '/avatar.jpeg'}
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-[52px] h-[52px] rounded-2xl p-1 bg-white/10 "
                />
                <div className="flex flex-col text-sm gap-1">
                    <h1 className="font-[unbounded]">{
                        (telegramUser.first_name ?? '') + (telegramUser.last_name ?? '')}</h1>
                    <span className="px-2 py-1 rounded-full bg-white/20 flex gap-2 w-fit">
						{user.pacman.coin}
                        <Image src="/coin.svg" alt="heart" width={16} height={16} />
					</span>
                </div>
            </div>
        </header>
    );
};
export default Header;