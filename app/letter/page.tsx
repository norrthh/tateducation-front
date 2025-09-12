'use client'


import {useEffect} from "react";

export default function Home() {
    return (
        <div>
            <p className="task"></p>
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
