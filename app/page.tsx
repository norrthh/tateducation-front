'use client'


import {useEffect} from "react";

export default function Home() {
    useEffect(() => {
        window.location.href = '/register'
    }, []);
    return (
        <div>
            <p>123</p>
        </div>
    );
}
