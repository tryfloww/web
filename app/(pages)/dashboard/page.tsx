import { validateRequest } from "@/lib/lucia";
import OwnerBar from "./OwnerBar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import OwnedChannels from "./Owned";

export default async function Home() {
  const { user } = await validateRequest();
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!user) {
    redirect("/home");
  }
  return (
    <div className="h-screen flex flex-col bg-[#f9f9f9] dark:bg-neutral-950 justfiy-center items-center w-screen p-24 font-[family-name:var(--font-geist-sans)]">
      <OwnerBar userId={userId || " "} />
      <OwnedChannels userId={userId || " "} />
    </div>
  );
}
