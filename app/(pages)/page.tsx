import { validateRequest } from "@/lib/lucia";
import ConnectYTButton from "@/components/ConnectYt";

export default async function Home() {
  const { user } = await validateRequest();

  return (
    <div className="min-h-screen p-24 font-[family-name:var(--font-geist-sans)]">
      {user ? <ConnectYTButton /> : "Hello"}
    </div>
  );
}
