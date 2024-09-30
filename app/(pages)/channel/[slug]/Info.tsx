import { PersonIcon } from '@radix-ui/react-icons';
export const Info = () => {
  return <div className="info bg-secondary w-full dark:bg-secondary/30 p-6  rounded-xl">
    <div className="flex gap-3 items-end">
      <img src="/default.png" alt="" className="h-28 w-28 rounded-full" />
      <div className="flex flex-col gap-[4px]">
        <p className="text-xl dark:text-neutral-100 text-neutral-950">youtube channel</p>
        <p className="text-md text-neutral-400">@youtube-channel143</p>
        <div className="flex gap-2 items-center text-red-700">
          <PersonIcon />
          <p className="text-md text-neutral-400">1.4m</p>
        </div>
      </div>
    </div>
  </div>
}
