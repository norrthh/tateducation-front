'use client'

import {notFound} from 'next/navigation';
import useSiteStore from "@/store/useSiteStore";
import {use, useEffect} from "react";
import Image from "next/image";
import {Input} from "@/components/ui/input";

type Props = { params: { id: string; childId: string } };
type RouteParams = { id: string; childId: string };

export default function Page({params}: { params: Promise<RouteParams> }) {    // если нужны только числа — валидируем
    const {id, childId} = use(params);

    if (!/^\d+$/.test(id) || !/^\d+$/.test(childId)) notFound();

    const {setFooter} = useSiteStore()

    useEffect(() => {
        setFooter(false)
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-lg text-[#0F3B49] font-bold text-center uppercase">Письмо</h1>

            <div className="flex items-center justify-center gap-2">
                <div className="bg-[var(--main)] rounded-4xl text-center relative"
                     style={{'padding': '2px 10px', 'height': '25px', 'width': '25px'}}>
                    <p className="text-white  font-bold text-sm absolute left-0 right-0 top-[2px]">1</p>
                </div>

                <div className="bg-[#C8102E] rounded-4xl text-center relative"
                     style={{'padding': '2px 10px', 'height': '25px', 'width': '25px'}}>
                    <p className="text-white  font-bold text-sm absolute left-0 right-0 top-[2px]">1</p>
                </div>

                <div className="border-2 border-[var(--main] rounded-4xl text-center relative"
                     style={{'padding': '2px 10px', 'height': '25px', 'width': '25px'}}>
                    <p className="text-[#0F3B49] font-bold text-sm absolute left-0 right-0 top-0">1</p>
                </div>

                <div className="border-2 border-[#9A9A9A] rounded-4xl text-center relative"
                     style={{'padding': '2px 10px', 'height': '25px', 'width': '25px'}}>
                    <p className="text-[#0F3B49] font-bold text-sm absolute left-0 right-0 top-0">1</p>
                </div>
            </div>

            <div className="flex justify-center gap-1 items-center">
                <Image src="/images/bars-speak.svg" alt="bars-speak.svg" width="76" height="95"/>

               <div className="bg-[url(/images/form_question.svg)] max-w-[150px] w-full h-[35px] bg-no-repeat" style={{'padding': '7px 17px'}}>
                    <p className="text-sm font-bold">Здравствуйте!</p>
               </div>
            </div>


            <Input />
        </div>
    );
}
