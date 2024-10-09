"use client";
import { useParams } from 'next/navigation';
import { Info } from './Info';
import { Team } from './Team';
import { Scheduled } from './Scheduled';
import { Pending } from './Pending';

export default function ChannelPage() {
  const router = useParams()
  const channelId = Array.isArray(router.slug) ? router.slug[0] : router.slug;
  return <div className="min-h-screen md:h-screen flex flex-col bg-[#f9f9f9] dark:bg-neutral-950 justfiy-center items-center w-screen p-4 pt-[4rem] md:pt-24 md:p-12 xl:p-24 font-[family-name:var(--font-geist-sans)]">
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
              <Scheduled channelId={channelId} />
              <Pending channelId={channelId} />
            </div>
            <div className="grow px-0 md:px-6 md:mt-0 mt-6">
              <div className="w-full h-full p-4 rounded-md dark:bg-secondary/30 bg-secondary">
                <p className="text-lg mb-4"> Videos and Playlists</p>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <div className="w-48 h-28 bg-neutral-300 p-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div >
}
