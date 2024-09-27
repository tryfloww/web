import { validateRequest } from "@/lib/lucia";
import ConnectYTButton from "@/components/ConnectYt";
import { validateConnection } from "@/lib/yt";
import { redirect } from "next/navigation";
export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/");
  }
  const { isConnected } = await validateConnection();
  return (
    <div className="h-screen flex flex-col bg-neutral-100 dark:bg-neutral-950 justfiy-center items-center w-screen p-24 font-[family-name:var(--font-geist-sans)]">
      {isConnected ? <p>Helo</p> : <ConnectYTButton />}
    </div>
  );
}
