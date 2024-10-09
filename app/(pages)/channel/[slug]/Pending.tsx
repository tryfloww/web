import { Button } from '@/components/ui/button';
export const Pending = ({ channelId }: { channelId: string }) => {
  return <div className="h-[20rem] md:h-1/2 mt-6">
    <div className="p-3 bg-secondary rounded-md flex justify-center items-center flex-col h-full dark:bg-secondary/30 relative">

      <div className="absolute bg-gradient-to-br from-green-900/10 via-neutral-100 shadow-lg dark:via-neutral-950/10 to-green-500/10 top-0 left-0 h-full w-full rounded-md">

      </div>

      <p className="text-green-400 z-[10] text-[5rem] font-bold">10</p>
      <p className="text-md text-neutral-950 dark:text-white z-[10] mb-4">tasks waiting approval.</p>

      <Button asChild variant={"secondary"} className="z-[10]">
        <a href={`${channelId}/waitlist`}>Manage Tasks</a>
      </Button>


    </div>
  </div>
}

