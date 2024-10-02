import { Button } from '@/components/ui/button';
export const Scheduled = () => {
  return <div className="p-3 w-full bg-secondary relative rounded-md h-[20rem] md:h-1/2 dark:bg-secondary/30 flex flex-col justify-center items-center">
    <div className="absolute bg-gradient-to-bl from-red-600/10 via-neutral-950/10 to-red-500/10 top-0 left-0 h-full w-full rounded-md">

    </div>
    <p className="text-primary z-[10] text-[5rem] font-bold">30</p>
    <p className="text-md z-[10] mb-4">scheduled videos.</p>

    <Button asChild className="z-[10]">
      <a href="asdf">Manage Schedule</a>
    </Button>

  </div>
}
