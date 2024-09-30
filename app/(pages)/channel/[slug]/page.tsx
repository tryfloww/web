"use client";
import { useParams } from 'next/navigation';
import { Info } from './Info';

export default function ChannelPage() {
  const router = useParams()
  console.log(router)
  return <div className="h-screen flex flex-col bg-[#f9f9f9] dark:bg-neutral-950 justfiy-center items-center w-screen p-8 pt-24 md:pt-24 md:p-12 xl:p-24 font-[family-name:var(--font-geist-sans)]">
    <div className="md:flex-row h-full flex flex-col w-full">
      <div className="w-1/3 h-full p-2">
        <div className="w-full p-3 h-full flex flex-col gap-6">
          <Info />
          <div className="grow bg-secondary rounded-md dark:bg-secondary/30 p-2"></div>
        </div>
      </div>
      <div className="w-2/3 h-full p-2">
        <div className="w-full py-3 h-full flex flex-col gap-6">
          <div className="w-full rounded-md p-3 bg-secondary dark:bg-secondary/30">right</div>
        </div>
      </div>
    </div>
  </div>
}
