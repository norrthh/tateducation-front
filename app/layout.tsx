'use client'

import type {Metadata} from "next";
import {Geist, Geist_Mono, Open_Sans, Unbounded} from "next/font/google";
import "./globals.css";
import React, {useEffect, useState} from "react";
import useUserStore from "@/store/useUserStore";
import useTelegramStore from "@/store/useUserTelegram";
import {
    backButton,
    init,
    isTMA,
    retrieveLaunchParams,
    retrieveRawInitData,
    swipeBehavior, viewport, useSignal
} from "@telegram-apps/sdk-react";

import {I18nProvider} from "@/i18n/I18nProvider";
import Footer from "@/components/footer";
import useSiteStore from "@/store/useSiteStore";

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
    const footer = useSiteStore(s => s.footer);

    useEffect(() => {
        if (isTMA()) {
            init()

            const initUser = () => {
                try {
                    const userTelegramData = retrieveLaunchParams().tgWebAppData?.user

                    setTelegramUser({
                        id: userTelegramData?.id,
                        first_name: userTelegramData?.first_name,
                        last_name: userTelegramData?.last_name,
                        username: userTelegramData?.username,
                        is_premium: userTelegramData?.is_premium,
                        photo_url: userTelegramData?.photo_url,
                        lang: userTelegramData?.language_code
                    })
                } catch (error) {
                    console.log(error)
                    setStatus(false)
                }
            }

            initUser()
        }
    }, [setTelegramUser, setBearerToken, setUser, setStatus])

    const insets = useSignal(viewport.contentSafeAreaInsets);

    useEffect(() => {
        (async () => {
            if (viewport.mount.isAvailable()) {
                await viewport.mount();                 // важно дождаться mount
                if (viewport.expand.isAvailable()) viewport.expand();
            }
            if (swipeBehavior.mount.isAvailable()) {
                swipeBehavior.mount();
                swipeBehavior.disableVertical();
            }
        })();

        return () => {
            try {
                viewport.unmount?.();
            } catch {
            }
        };
    }, []);

    return (
        <html lang="ru">
        <body
            className={`${unbounded.variable} ${openSans.variable} font-[unbounded] antialiased max-w-xl mx-auto h-screen overflow-hidden`}
        >
        <div className="z-40 relative h-full px-4"
             style={{'paddingTop': (insets.top !== 0 ? insets.top + 20 : 0)}}>
            <I18nProvider>
                <div className="mt-[31px]">
                    {children}
                </div>
                {footer && (
                    <>
                        {footer ? 1 : 2}
                        <Footer/>
                    </>
                )}
            </I18nProvider>
        </div>
        </body>
        </html>
    );
}
