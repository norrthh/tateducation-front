'use client'

import type {Metadata} from "next";
import {Geist, Geist_Mono, Open_Sans, Unbounded} from "next/font/google";
import "./globals.css";
import React, {useEffect, useState} from "react";
import useUserStore from "@/store/useUserStore";
import useTelegramStore from "@/store/useUserTelegram";
import {isTMA, retrieveLaunchParams} from '@telegram-apps/bridge';
import {init, viewport} from "@telegram-apps/sdk-react";
import Header from "@/components/header";
import {I18nProvider} from "@/i18n/I18nProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const unbounded = Unbounded({
    variable: "--font-unbounded-sans",
    subsets: ["latin"],
});

const openSans = Open_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"],
});

interface ContentSafeAreaInset {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [status, setStatus] = useState(false)
    const {setUser, setBearerToken} = useUserStore()
    const {setTelegramUser} = useTelegramStore()

    const [contentSageAreaInset, setContentSageAreaInset] = useState<ContentSafeAreaInset>({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    });

    // useEffect(() => {
    //     init()
    //     const initUser = () => {
    //         try {
    //             const userTelegramData = retrieveLaunchParams().tgWebAppData?.user
    //
    //             setTelegramUser({
    //                 id: userTelegramData?.id,
    //                 first_name: userTelegramData?.first_name,
    //                 last_name: userTelegramData?.last_name,
    //                 username: userTelegramData?.username,
    //                 is_premium: userTelegramData?.is_premium,
    //                 photo_url: userTelegramData?.photo_url,
    //                 lang: userTelegramData?.language_code
    //             })
    //         } catch (error) {
    //             console.log(error)
    //             setStatus(false)
    //         }
    //     }
    //
    //     initUser()
    // }, [setTelegramUser, setBearerToken, setUser, setStatus])
    //
    // useEffect(() => {
    //     if (viewport.expand.isAvailable()) {
    //         viewport.expand();
    //         setContentSageAreaInset(
    //             viewport.contentSafeAreaInsets()
    //         )
    //     }
    // }, []);

    return (
        <html lang="en">
        <body
            className={`${unbounded.variable} ${openSans.variable} font-[unbounded] antialiased overflow-hidden bg-black max-w-xl mx-auto h-screen`}
        >
            <div className="z-40 relative h-full px-4" style={{'paddingTop': contentSageAreaInset.top + 10 + 'px'}}>
                <I18nProvider>{children}</I18nProvider>
            </div>
        </body>
        </html>
    );
}
