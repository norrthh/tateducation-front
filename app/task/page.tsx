'use client'

import Image from 'next/image'
import {useState} from 'react'

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

const tasks: Task[] = [
    {
        id: 1,
        chapter: 'Глава 1',
        subtitle: 'Важные фразы на татарском языке',
        progress: 0.8,
        cover: '/images/bookapple.svg',
        variant: 'filled',
        items: [
            {id: 11, title: 'Грамматика', status: 'done', icon: '/images/gramm.svg'},
            {id: 12, title: 'Аудирование', status: 'in-progress', icon: '/images/success.svg'},
            {id: 13, title: 'Письмо', status: 'in-progress', icon: '/images/pismo.svg'},
        ],
    },
    {
        id: 2,
        chapter: 'Глава 2',
        subtitle: 'Приветствия и диалоги',
        progress: 1,
        cover: '/images/success.svg',
        variant: 'outline',
        items: [
            {id: 21, title: 'Грамматика', status: 'done', icon: '/images/gramm.svg'},
            {id: 22, title: 'Аудирование', status: 'done', icon: '/images/success.svg'},
            {id: 23, title: 'Письмо', status: 'done', icon: '/images/pismo.svg'},
        ],
    },
    {
        id: 3,
        chapter: 'Глава 3',
        subtitle: 'Семья и знакомство',
        progress: 0.35,
        cover: '/images/bookapple.svg',
        variant: 'outline',
        items: [
            {id: 31, title: 'Грамматика', status: 'in-progress', icon: '/images/gramm.svg'},
            {id: 32, title: 'Аудирование', status: 'in-progress', icon: '/images/success.svg'},
            {id: 33, title: 'Письмо', status: 'in-progress', icon: '/images/pismo.svg'},
        ],
    },
    {
        id: 4,
        chapter: 'Глава 3',
        subtitle: 'Семья и знакомство',
        progress: 0.35,
        cover: '/images/bookapple.svg',
        variant: 'outline',
        items: [
            {id: 31, title: 'Грамматика', status: 'in-progress', icon: '/images/gramm.svg'},
            {id: 32, title: 'Аудирование', status: 'in-progress', icon: '/images/success.svg'},
            {id: 33, title: 'Письмо', status: 'in-progress', icon: '/images/pismo.svg'},
        ],
    },
]

export default function Home() {
    const [openId, setOpenId] = useState<number | null>(null)

    const toggle = (task: Task) => {
        if (task.progress !== 1) {
            setOpenId(prev => (prev === task.id ? null : task.id))
        }
    }

    const openTaskItem = (task: LessonItem, taskId: number) => {
        // console.log(Task)
        // console.log('task-id:' + taskId)
        if (task.status === 'in-progress') {
            window.location.href = '/task/' + taskId + '/' + task.id
        }
    }

    return (
        <div>
            <h1 className="font-bold text-2xl text-[#0F3B49]">Задания</h1>

            <div className="flex flex-col gap-2 h-[80vh] overflow-y-auto scrollbar-hide pt-4">
                {tasks.map(task => {
                    const pct = Math.round(task.progress * 100)
                    const isOpen = openId === task.id
                    const isFilled = task.variant === 'filled' || pct < 100

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
                                        : 'border-2 border-[var(--main)] text-[#0F3B49]',
                                ].join(' ')}
                            >
                                <div className="flex gap-4 items-center">
                                    <div className="min-w-0">
                                        <h2 className="text-xl font-bold">{task.chapter}</h2>
                                        <p className={['text-sm font-medium pt-[3px] pb-[9px]', isFilled ? '' : 'text-[#0F3B49]'].join(' ')}>
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
                            {isOpen && task.items?.length ? (
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
                                                        <h3 className="font-bold text-lg text-[#154734]">{item.title}</h3>
                                                        {item.status === 'done' && (
                                                            <p className="text-sm text-[#0F3B49] font-medium text-start">Завершено</p>
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
