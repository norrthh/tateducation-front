'use client'


import {useEffect} from "react";
import useTelegramStore from "@/store/useUserTelegram";
import Image from "next/image";

export default function Home() {
    // useEffect(() => {
    //     window.location.href = '/register'
    // }, []);
    const {telegramUser} = useTelegramStore()

    return (
        <div>
            <header className="header">
                <div className="profile_info">
                    <img src={telegramUser.photo_url} alt="user pfp" className="profile_img rounded-2xl" width={42} height={42}/>
                    <div className="profile_text">
                        <p className="profile_hello">
                            Привет!
                        </p>
                        <p className="profile_name">
                            {telegramUser.first_name}
                        </p>
                    </div>
                </div>
                <div className="user_exp">
                    393 XP
                </div>
            </header>

            <main className="flex flex-col gap-2 h-[80vh] overflow-y-auto">
                <div className="chapter">
                    <p className="chapter_type">Начальный</p>
                    <p className="chapter_level">Глава 3</p>
                    <p className="chapter_discription">Основные правила грамматики</p>
                    <a href="#" className="chapter_button">Вернуться</a>
                </div>

                <div className="progress">
                    <p className="my_progress">Мой прогресс</p>

                    <div className="progress_cards overflow-y-auto">
                        <div className="progress_card">
                            <Image
                                src="/images/gram.svg"
                                alt=""
                                className="progress_icon"
                                width={48}
                                height={48}
                            />
                            <p className="progress_type">Грамматика</p>
                            <p className="your_progress">Твой прогресс <span className="progress_percent">51%</span></p>
                            <div className="progress_bar">
                                <div className="progress_fill"></div>
                            </div>
                        </div>
                        <div className="progress_card">
                            <Image
                                src="/images/aud.svg"
                                alt=""
                                className="progress_icon"
                                width={48}
                                height={48}
                            />
                            <p className="progress_type">Аудирование</p>
                            <p className="your_progress">Твой прогресс <span className="progress_percent">51%</span></p>
                            <div className="progress_bar">
                                <div className="progress_fill"></div>
                            </div>
                        </div>
                        <div className="progress_card">
                            <Image
                                src="/images/aud.svg"
                                alt=""
                                className="progress_icon"
                                width={48}
                                height={48}
                            />

                            <p className="progress_type">Письмо</p>
                            <p className="your_progress">Твой прогресс <span className="progress_percent">51%</span></p>
                            <div className="progress_bar">
                                <div className="progress_fill"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user_top">
                    <p className="user_top_title">Топ 3 учеников</p>

                   <div className="flex flex-col gap-2 h-[40vh] overflow-y-auto mb-10">
                       <div className="user_top_item">
                           <div className="user_top_item_info">
                               <img src="/images/user_icon.png" alt="" className="user_top_item_icon" width={27} height={27}/>
                               <div className="user_top_item_text">
                                   <p className="user_top_item_name">Павел</p>
                                   <p className="user_top_item_exp">1590 XP</p>
                               </div>
                           </div>
                       </div>
                       <div className="user_top_item">
                           <div className="user_top_item_info">
                               <img src="/images/user_icon.png" alt="" className="user_top_item_icon" width={27}
                                    height={27}/>
                               <div className="user_top_item_text">
                                   <p className="user_top_item_name">Павел</p>
                                   <p className="user_top_item_exp">1590 XP</p>
                               </div>
                           </div>
                       </div>
                       <div className="user_top_item">
                           <div className="user_top_item_info">
                               <img src="/images/user_icon.png" alt="" className="user_top_item_icon" width={27}
                                    height={27}/>
                               <div className="user_top_item_text">
                                   <p className="user_top_item_name">Павел</p>
                                   <p className="user_top_item_exp">1590 XP</p>
                               </div>
                           </div>
                       </div>
                       <div className="user_top_item">
                           <div className="user_top_item_info">
                               <img src="/images/user_icon.png" alt="" className="user_top_item_icon" width={27}
                                    height={27}/>
                               <div className="user_top_item_text">
                                   <p className="user_top_item_name">Павел</p>
                                   <p className="user_top_item_exp">1590 XP</p>
                               </div>
                           </div>
                       </div>
                       <div className="user_top_item">
                           <div className="user_top_item_info">
                               <img src="/images/user_icon.png" alt="" className="user_top_item_icon" width={27}
                                    height={27}/>
                               <div className="user_top_item_text">
                                   <p className="user_top_item_name">Павел</p>
                                   <p className="user_top_item_exp">1590 XP</p>
                               </div>
                           </div>
                       </div>
                   </div>
                </div>
            </main>
        </div>
    );
}
