'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'
import apiClient from "@/axios";

type LessonItem = {
    id: number
    title: string
    status?: 'done' | 'in-progress'
    icon: string
}

type Task = {
    id: number
    chapter: string
    subtitle: string
    progress: number // 0..1
    cover: string
    variant?: 'filled' | 'outline'
    items?: LessonItem[]
}

export default function Home() {
    const [openId, setOpenId] = useState<number | null>(null)

    const [tasks, setTasks] = useState<Task[]>([])

    const toggle = (task: Task) => {
        // if (task.progress !== 1) {
            setOpenId(prev => (prev === task.id ? null : task.id))
        // }
    }

    const openTaskItem = (task: LessonItem, taskId: number) => {
        if (task.status === 'in-progress') {
            window.location.href = '/task/' + taskId + '/' + task.id
        }
    }

    useEffect(() => {
        apiClient.get('/v1/users/tasks/').then(res => {
            setTasks(res.data)
        })
    }, []);

    return (
        <div>
            <h1 className="font-bold text-2xl text-[var(--h1)]">Задания</h1>

            <div className="flex flex-col gap-2 h-[80vh] overflow-y-auto scrollbar-hide pt-4">
                {tasks.map(task => {
                    const pct = Math.round(task.progress * 100)
                    const isOpen = openId === task.id
                    const isFilled = task.variant === 'filled' || pct < 100

                    // if (task.items?.length == 0) {
                    //     return (<div key={task.id}></div>);
                    // }

                    return (
                        <div key={task.id} className="flex flex-col gap-2">
                            {/* Карточка задания */}
                            <button
                                type="button"
                                onClick={() => toggle(task)}
                                className={[
                                    'w-full rounded-2xl p-5 text-left transition-colors',
                                    isFilled
                                        ? 'bg-[var(--main)] text-white'
                                        : 'border-2 border-[var(--main)] text-white',
                                ].join(' ')}
                            >
                                <div className="flex gap-4 items-center">
                                    <div className="min-w-0">
                                        <h2 className="text-xl font-bold">{task.chapter}</h2>
                                        <p className={['text-sm font-medium pt-[3px] pb-[9px]', isFilled ? '' : 'text-white'].join(' ')}>
                                            {task.subtitle}
                                        </p>
                                        <div className="flex gap-4 items-center">
                                            <div
                                                className="relative bg-[#E0FFE2] w-full h-[7px] rounded-3xl overflow-hidden">
                                                <div
                                                    className="bg-[#6AAF5C] h-full rounded-3xl"
                                                    style={{width: `${pct}%`}}
                                                />
                                            </div>
                                            <p className="font-medium text-sm">{pct}%</p>
                                        </div>
                                    </div>

                                    <Image
                                        src={task.cover}
                                        width={50}
                                        height={67}
                                        alt="cover"
                                        className="ml-auto"
                                    />
                                </div>
                            </button>

                            {/* Раскрывающийся блок с уроками */}
                            {isOpen && task.items?.length && task.items?.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {task.items.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => {openTaskItem(item, task.id)}}
                                        >
                                            <div
                                                className="border-2 border-[var(--main)] p-5 rounded-2xl"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-white">{item.title}</h3>
                                                        {item.status === 'done' && (
                                                            <p className="text-sm text-white font-medium text-start">Завершено</p>
                                                        )}
                                                    </div>

                                                    <Image
                                                        src={item.icon}
                                                        width={51}
                                                        height={51}
                                                        alt={item.title}
                                                        className="ml-auto"
                                                    />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
