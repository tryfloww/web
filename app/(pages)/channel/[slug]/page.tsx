"use client";
import { useParams } from 'next/navigation';
import { Info } from './Info';
import { Team } from './Team';
import { Scheduled } from './Scheduled';
import { Pending } from './Pending';

export default function ChannelPage() {
  const router = useParams()
  console.log(router)
  return <div className="h-screen flex flex-col bg-[#f9f9f9] dark:bg-neutral-950 justfiy-center items-center w-screen p-4 pt-[4rem] md:pt-24 md:p-12 xl:p-24 font-[family-name:var(--font-geist-sans)]">
    <div className="md:flex-row h-full flex flex-col w-full">
      <div className="w-full md:w-1/3 h-full p-2">
        <div className="w-full p-3 h-full flex flex-col gap-6">
          <Info />
          <Team />
        </div>
      </div>
      <div className="w-full md:w-2/3 h-full p-2">
        <div className="w-full px-3 md:px-0 py-0 md:py-3 h-full flex flex-col gap-6">
          <div className="w-full h-full rounded-md md:flex-row flex-col flex">
            <div className="flex h-full flex-col w-full md:w-1/3 flex-col">
              <Scheduled />
              <Pending />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
