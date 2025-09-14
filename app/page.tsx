'use client'

import {useEffect, useState} from "react";
import useTelegramStore from "@/store/useUserTelegram";
import Image from "next/image";
import useUserStore, {TelegramUserDTO} from "@/store/useUserStore";
import Preloader from "@/components/preloader";
import {useLessonStore} from "@/store/useLessonStore";
import apiClient from "@/axios";

export default function Home() {
    const {user} = useUserStore()
    const {data: lessonData} = useLessonStore();

    // console.log(lessonData?.lesson.description)

    useEffect(() => {
        if (!user.status) {
            window.location.href = '/register'
        }
    }, [user.status]);

    const {telegramUser} = useTelegramStore()

    if (!user.status) {
        return <Preloader/>
    }

    const grammar = lessonData?.progress.by_category.grammar ?? {
        label: 'Грамматика',
        percent: 0,
        passed: false,
    };
    const listening = lessonData?.progress.by_category.listening ?? {
        label: 'Аудирование',
        percent: 0,
        passed: false,
    };
    const writing = lessonData?.progress.by_category.writing ?? {
        label: 'Письмо',
        percent: 0,
        passed: false,
    };

    const nextUnpassed = lessonData?.next_unpassed?.name ?? '—';

    const [tops, setTops] = useState<TelegramUserDTO[]>([])

    useEffect(() => {
        apiClient.get('/v1/users/tops').then(res => {
            console.log(res.data)
            setTops(res.data)
        })
    }, [setTops]);

    return (
        <div>
            <header className="header">
                <div className="profile_info">
                    <img src={telegramUser.photo_url} alt="user pfp" className="profile_img rounded-2xl" width={42}
                         height={42}/>
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
                    {user.xp} XP
                </div>
            </header>

            <main className="flex flex-col gap-2 h-[80vh] overflow-y-auto">
                <div className="chapter">
                    <p className="chapter_type">Начальный</p>
                    <p className="chapter_level">
                        {lessonData?.lesson?.name ? `Глава: ${lessonData.lesson.name}` : 'Глава'}
                    </p>

                    {JSON.stringify(lessonData?.lesson)}

                    <p className="chapter_discription">{lessonData?.lesson.description}</p>
                    {/*<a href="#" className="chapter_button">Вернуться</a>*/}
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
                            <p className="progress_type">{grammar.label}</p>
                            <p className="your_progress">
                                Твой прогресс <span className="progress_percent">{grammar.percent}%</span>
                            </p>
                            <div className="progress_bar">
                                <div className="progress_fill" style={{width: `${grammar.percent}%`}}/>
                            </div>
                        </div>

                        {/* Аудирование */}
                        <div className="progress_card">
                            <Image
                                src="/images/aud.svg"
                                alt=""
                                className="progress_icon"
                                width={48}
                                height={48}
                            />
                            <p className="progress_type">{listening.label}</p>
                            <p className="your_progress">
                                Твой прогресс <span className="progress_percent">{listening.percent}%</span>
                            </p>
                            <div className="progress_bar">
                                <div className="progress_fill" style={{width: `${listening.percent}%`}}/>
                            </div>
                        </div>

                        {/* Письмо */}
                        <div className="progress_card">
                            <Image
                                src="/images/pismo.svg"
                                alt=""
                                className="progress_icon"
                                width={48}
                                height={48}
                            />
                            <p className="progress_type">{writing.label}</p>
                            <p className="your_progress">
                                Твой прогресс <span className="progress_percent">{writing.percent}%</span>
                            </p>
                            <div className="progress_bar">
                                <div className="progress_fill" style={{width: `${writing.percent}%`}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user_top">
                    <p className="user_top_title">Топ 3 учеников</p>

                    <div className="flex flex-col gap-2 h-[40vh] overflow-y-auto mb-10">
                        {tops && tops.map((top, id) => (
                            <div className="user_top_item" key={id}>
                                <div className="user_top_item_info items-center">
                                    <img src={top.telegram_photo_url} alt="" className="user_top_item_icon rounded-lg" width={40} height={40}/>
                                    <div className="user_top_item_text">
                                        <p className="user_top_item_name text-sm">{top.name}</p>
                                        <p className="user_top_item_exp text-[12px]">{top.xp} XP</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </main>
        </div>
    );
}
