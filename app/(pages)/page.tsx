import { validateRequest } from "@/lib/lucia";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";

export default async function Home() {
  const { user } = await validateRequest();

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {user ? <SignOutButton /> : <SignInButton />}
    </div>
  );
}
