'use client'

import Image from "next/image";
import {useI18n} from "@/i18n/I18nProvider";

const Preloader = () => {
    const {t} = useI18n();

    return (
        <div className="flex items-center h-full flex-col gap-10 justify-center relative">
            <Image src="/images/bars.svg" alt="bars" width={200} height={220} className="mx-auto"/>

            <h1 className="text-2xl font-bold text-center text-[var(--h1)]"
                dangerouslySetInnerHTML={{__html: t("welcome_title").replace("\n", "<br/>")}}/>
        </div>
    );
};

export default Preloader;
