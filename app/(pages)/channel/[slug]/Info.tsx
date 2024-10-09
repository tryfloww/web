import { PersonIcon } from '@radix-ui/react-icons';
export const Info = () => {
  return <div className="info w-full shadow-lg bg-secondary dark:bg-secondary/30 p-6 relative  rounded-xl">
    <img className="absolute top-0 left-0 opacity-10 -z-1 h-full w-full rounded-xl object-cover" src="/default.png" />
    <div className="flex gap-3 items-end z-[10]">
      <img src="/default.png" alt="" className="h-28 z-[10] w-28 rounded-full" />
      <div className="flex flex-col gap-[4px]">
        <p className="text-xl dark:text-neutral-100 z-[10] text-neutral-950">youtube channel</p>
        <p className="text-md text-neutral-400">@youtube-channel143</p>
        <div className="flex gap-2 items-center text-red-700">
          <PersonIcon />
          <p className="text-md text-neutral-400">1.4m</p>
        </div>
      </div>
    </div>
  </div>
}
