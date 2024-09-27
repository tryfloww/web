import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 p-24 font-[family-name:var(--font-geist-sans)]">
    </div>
  );
}
