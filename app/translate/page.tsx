'use client'

import Image from 'next/image'
import {useState} from 'react'

export default function Translate() {
    return (
        <div>
            <h1 className="mb-2 pt-10 text-center text-lg font-bold uppercase text-white">Переводчик</h1>            
            <div className="translate_type">
                <p className="source_lang">Русский</p>
                <a href="" className="round_arrow_link"><img src="/images/rounded_arrow.svg" alt="" className="round_arrow" /></a>
                <p className="target_lang">Татарский</p>
            </div>
            <textarea name="" id="source_lang_area" placeholder='Привет! Как у тебя дела сегодня?'></textarea>
            <textarea name="" id="target_lang_area" placeholder='Сәлам! Бүген синең эшләрең ничек?' disabled></textarea>
            <button className="translate_button">
                Перевести
            </button>

        </div>
    )
}