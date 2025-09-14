'use client'

import Image from 'next/image'
import {useState} from 'react'

export default function Shop() {
    return (
        <div>
            <h1 className="mb-2 pt-10 text-center text-lg font-bold text-white">Магазин</h1>
            <p className="shop_text">Здесь вы можете обменять <br />свои баллы на наш мерч</p>
            <div className="cards">
                <div className="card">
                    <div className="card-img-area">
                        <img src="images/худи.png" alt="" className="card-img" />
                    </div>
                    <div className="card-text-area">
                        <p className="card-name">Худи «ТатЛэнд»</p>
                        <p className="card-text">Размеры: S - XL <br /> Материал: хлопок</p>
                        <p className="card-price">998 exp</p>
                        <a href="#" className="card-button">Купить</a>
                    </div>
                </div>
                <div className="card">
                    <div className="card-img-area">
                        <img src="images/кружка.png" alt="" className="card-img" />
                    </div>
                    <div className="card-text-area">
                        <p className="card-name">Кружка «ТатЛэнд»</p>
                        <p className="card-text">Объем: 400 мл <br /> Материал: металл, эмаль</p>
                        <p className="card-price">499 exp</p>
                        <a href="#" className="card-button">Купить</a>
                    </div>
                </div>
                <div className="card">
                    <div className="card-img-area">
                        <img src="images/носки.png" alt="" className="card-img" />
                    </div>
                    <div className="card-text-area">
                        <p className="card-name">Носки «ТатЛэнд»</p>
                        <p className="card-text">Размер: 36-42 <br /> Материал: хлопок</p>
                        <p className="card-price">299 exp</p>
                        <a href="#" className="card-button">Купить</a>
                    </div>
                </div>
                <div className="card">
                    <div className="card-img-area">
                        <img src="images/шоппер.png" alt="" className="card-img" />
                    </div>
                    <div className="card-text-area">
                        <p className="card-name">Шопер «ТатЛэнд»</p>
                        <p className="card-text">Размер: 36-42 <br /> Материал: хлопок</p>
                        <p className="card-price">450 exp</p>
                        <a href="#" className="card-button">Купить</a>
                    </div>
                </div>
            </div>
        </div>
    )
}