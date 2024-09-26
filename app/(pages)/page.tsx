import { validateRequest } from "@/lib/lucia";
import ConnectYTButton from "@/components/ConnectYt";
import { validateConnection } from "@/lib/yt";

export default async function Home() {
  const { user } = await validateRequest();
  const {isConnected} = await validateConnection()
  return (
    <div className="min-h-screen p-24 font-[family-name:var(--font-geist-sans)]">
    {user &&
      (isConnected ? <ConnectYTButton /> : "Hello")
    }
    </div>
  );
}
