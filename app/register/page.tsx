"use client";

import {useState} from "react";
import Image from "next/image";
import {useI18n} from "@/i18n/I18nProvider";

export default function Register() {
    const [step, setStep] = useState<number>(0);
    const {lang, setLang, t} = useI18n();
    const [level, setLevel] = useState<string>('junior')
    const [goal, setGoal] = useState<number>(10)

    const getBtnLanguageClass = (code: "ru" | "tt") =>
        lang === code
            ? "w-full text-start p-3 bg-[#154734] text-white rounded-xl"
            : "w-full text-start p-3 text-[#0F3B49] rounded-xl border border-[#52727B]";

    const getBtnLevelClass = (code: "junior" | "middle" | "senior") =>
        level === code
            ? "w-full text-start p-3 bg-[#154734] text-white rounded-xl"
            : "w-full text-start p-3 text-[#0F3B49] rounded-xl border border-[#52727B]";

    const getBtnGoalClass = (code: 10 | 15 | 20 | 25 | 30) =>
        goal === code
            ? "w-full text-center p-3 bg-[#154734] text-white rounded-3xl"
            : "w-full text-center p-3 text-[#0F3B49] rounded-3xl border border-[#52727B]";

    return (
        <div className="relative h-full">
            {step === 0 && (
                <div className="flex items-center h-full flex-col gap-10 justify-center relative">
                    <Image src="/images/bars.svg" alt="bars" width={200} height={220} className="mx-auto"/>

                    <h1 className="text-2xl font-bold text-center text-[#0F3B49]"
                        dangerouslySetInnerHTML={{__html: t("welcome_title").replace("\n", "<br/>")}}/>
                    <p className="font-medium text-sm text-center text-[#0F3B49]">{t("welcome_desc")}</p>
                </div>
            )}

            {step === 1 && (
                <div className="flex flex-col gap-6 mt-[20px]">
                    <div className="flex gap-2">
                        <Image src="/images/arrow-right.svg"
                               alt="arrow-right"
                               width={30}
                               height={50}
                               className="mx-auto"
                               onClick={() => {
                                   setStep(step - 1)
                               }}
                        />
                        <Image src="/images/navbar-fill.svg" alt="navbar-fill" className="mx-auto" width={150}
                               height={50}/>
                        <Image src="/images/navbar-nofill.svg" alt="navbar-nofill" className="mx-auto" width={150}
                               height={50}/>
                        <Image src="/images/navbar-nofill.svg" alt="navbar-nofill" className="mx-auto" width={150}
                               height={50}/>
                    </div>

                    <div className="flex gap-4 flex-col">
                        <h1 className="text-2xl font-bold text-[#0F3B49]">{t("choose_lang_title")}</h1>
                        <p className="font-medium text-sm text-[#0F3B49]">{t("choose_lang_desc")}</p>
                    </div>

                    <div className="flex gap-4 flex-col font-medium text-sm">
                        <button className={getBtnLanguageClass("ru")} onClick={() => setLang("ru")}>
                            <span className="flex gap-4 items-center">
                                <Image src="/images/ru-flag.svg" alt="ru" width={30} height={30}/>
                                {t("russian")}
                            </span>
                        </button>

                        <button className={getBtnLanguageClass("tt")} onClick={() => setLang("tt")}>
                            <span className="flex gap-4 items-center">
                                <Image src="/images/tat-flag.svg" alt="tt" width={30} height={30}/>
                                {t("tatar")}
                            </span>
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col gap-6 mt-[20px]">
                    <div className="flex gap-2">
                        <Image src="/images/arrow-right.svg"
                               alt="arrow-right"
                               width={30}
                               height={50}
                               className="mx-auto"
                               onClick={() => {
                                   setStep(step - 1)
                               }}
                        />
                        <Image src="/images/navbar-fill.svg" alt="navbar-fill" className="mx-auto" width={150}
                               height={50}/>
                        <Image src="/images/navbar-fill.svg" alt="navbar-fill" className="mx-auto" width={150}
                               height={50}/>
                        <Image src="/images/navbar-nofill.svg" alt="navbar-nofill" className="mx-auto" width={150}
                               height={50}/>
                    </div>

                    <div className="flex gap-4 flex-col">
                        <h1 className="text-2xl font-bold text-[#0F3B49]">{t("choose_lang_title")}</h1>
                        <p className="font-medium text-sm text-[#0F3B49]">{t("choose_lang_desc")}</p>
                    </div>

                    <div className="flex gap-4 flex-col font-medium text-sm">
                        <button className={getBtnLevelClass("junior")} onClick={() => setLevel("junior")}>
                            {t("levels.junior")}
                        </button>

                        <button className={getBtnLevelClass("middle")} onClick={() => setLevel("middle")}>
                            {t("levels.middle")}
                        </button>

                        <button className={getBtnLevelClass("senior")} onClick={() => setLevel("senior")}>
                            {t("levels.senior")}
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="flex flex-col gap-6 mt-[20px]">
                    <div className="flex gap-2">
                        <Image src="/images/arrow-right.svg"
                               alt="arrow-right"
                               width={30}
                               height={50}
                               className="mx-auto"
                               onClick={() => {
                                   setStep(step - 1)
                               }}
                        />
                        <Image src="/images/navbar-fill.svg" alt="navbar-fill" className="mx-auto" width={150}
                               height={50}/>
                        <Image src="/images/navbar-fill.svg" alt="navbar-fill" className="mx-auto" width={150}
                               height={50}/>
                        <Image src="/images/navbar-fill.svg" alt="navbar-fill" className="mx-auto" width={150}
                               height={50}/>
                    </div>

                    <div className="flex gap-4 flex-col">
                        <h1 className="text-2xl font-bold text-[#0F3B49]">{t("goals.title")}</h1>
                        <p className="font-medium text-sm text-[#0F3B49]">{t("goals.description")}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 font-medium text-sm justify-center">
                        <button className={getBtnGoalClass(10)}
                                onClick={() => setGoal(10)}>
                            {t("goals.times.10")}
                        </button>

                        <button className={getBtnGoalClass(15)}
                                onClick={() => setGoal(15)}>
                            {t("goals.times.15")}
                        </button>

                        <button className={getBtnGoalClass(20)}
                                onClick={() => setGoal(20)}>
                            {t("goals.times.20")}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 font-medium text-sm justify-center">
                        <button className={getBtnGoalClass(25)}
                                onClick={() => setGoal(25)}>
                            {t("goals.times.25")}
                        </button>

                        <button className={getBtnGoalClass(30)}
                                onClick={() => setGoal(30)}>
                            {t("goals.times.30")}
                        </button>
                    </div>
                </div>
            )}

            <button className="bg-[#C8102E] w-full p-4 text-white rounded-xl font-semibold absolute bottom-[50px]"
                    onClick={() => setStep(step + 1)}>
                {t("next")}
            </button>
        </div>
    );
}
