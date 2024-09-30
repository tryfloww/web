import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Member } from "./Member"

export const Team = () => {
  return <div className="h-[30rem] gap-4 dark:text-neutral-100 text-neutral-950 md:grow bg-secondary rounded-md dark:bg-secondary/30 p-4 flex flex-col">
    <div className="flex items-center justify-between">
      <p className="text-xl">Team</p>
      <div className="flex gap-3">
        <Button>Edit Roles</Button>
        <Button variant="secondary">Invite</Button>
      </div>
    </div>
    <Input placeholder="Search For A Team Member" className="p-4" />
    <div className="flex gap-6 flex-col px-2 mt-2 grow overflow-y-auto team">
      <Member role="The Owner" roleColor="#41daac" username="username102" img="/default.png" />
      <Member role="Editor" roleColor="#41d" username="editorgod69" img="/default.png" />
      <Member role="Manager" roleColor="#d5a" username="managerguy" img="/default.png" />
    </div>
  </div>
}
