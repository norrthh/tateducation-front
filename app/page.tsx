'use client'


import {useEffect} from "react";

export default function Home() {
    // useEffect(() => {
    //     window.location.href = '/register'
    // }, []);
    return (
        <div>
            <header className="header">
                        <div className="profile_info">
                            <img src="/images/user_icon.png" alt="user pfp" className="profile_img" width={42} height={42}/>
                            <div className="profile_text">
                                <p className="profile_hello">
                                    Привет!
                                </p>
                                <p className="profile_name">
                                    Анастасия
                                </p>
                            </div>
                        </div>
                        <div className="user_exp">
                            393 XP
                        </div>
            </header>
            <main>
                <div className="chapter">
                    <p className="chapter_type">Начальный</p>
                    <p className="chapter_level">Глава 3</p>
                    <p className="chapter_discription">Основные правила грамматики</p>
                    <a href="#" className="chapter_button">Вернуться</a>
                </div>
                <div className="progress">
                    <p className="my_progress">Мой прогресс</p>
                    <div className="progress_cards">
                        <div className="progress_card">
                            <img src="/images/икон грам 1.png" alt="" className="progress_icon" width={48}/>
                            <p className="progress_type">Грамматика</p>
                            <p className="your_progress">Твой прогресс <span className="progress_percent">51%</span></p>
                            <div className="progress_bar">
                                <div className="progress_fill"></div>
                            </div>
                        </div>
                        <div className="progress_card">
                            <img src="/images/икон ауд 1.png" alt="" className="progress_icon" width={48}/>
                            <p className="progress_type">Аудирование</p>
                            <p className="your_progress">Твой прогресс <span className="progress_percent">51%</span></p>
                            <div className="progress_bar">
                                <div className="progress_fill"></div>
                            </div>
                        </div>
                        <div className="progress_card">
                            <img src="/images/икон 1.png" alt="" className="progress_icon" width={48}/>
                            <p className="progress_type">Письмо</p>
                            <p className="your_progress">Твой прогресс <span className="progress_percent">51%</span></p>
                            <div className="progress_bar">
                                <div className="progress_fill"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user_top">
                    <p className="user_top_title">Топ учеников</p>
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
                            <img src="/images/user_icon.png" alt="" className="user_top_item_icon" width={27} height={27}/>
                            <div className="user_top_item_text">
                                <p className="user_top_item_name">Павел</p>
                                <p className="user_top_item_exp">1590 XP</p>
                            </div>
                        </div>
                    </div>
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
                            <img src="/images/user_icon.png" alt="" className="user_top_item_icon" width={27} height={27}/>
                            <div className="user_top_item_text">
                                <p className="user_top_item_name">Павел</p>
                                <p className="user_top_item_exp">1590 XP</p>
                            </div>
                        </div>
                    </div>
                    <div className="user_top_item">
                        <div className="user_top_item_info">
                            <img src="/images/user_icon.png" alt="" className="user_top_item_icon" width={27} height={27}/>
                            <div className="user_top_item_text">
                                <p className="user_top_item_name">Павел</p>
                                <p className="user_top_item_exp">1590 XP</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="nav-bar">
               <a href="#" className="nav-item active">
                <img src="/images/nav-img1.svg" alt="" className="nav-item-img" />
               </a>
               <a href="#" className="nav-item">
                <img src="/images/nav-img3.svg" alt="" className="nav-item-img" />
               </a>
               <a href="#" className="nav-item">
                <img src="/images/nav-img2.svg" alt="" className="nav-item-img" />
               </a>
               <a href="#" className="nav-item">
                <img src="/images/nav-img4.svg" alt="" className="nav-item-img" />
               </a>
               <a href="#" className="nav-item">
                <img src="/images/nav-img5.svg" alt="" className="nav-item-img" />
               </a>
               <a href="#" className="nav-item">
                <img src="/images/nav-img6.svg" alt="" className="nav-item-img" />
               </a>
            </footer>
        </div>
    );
}
