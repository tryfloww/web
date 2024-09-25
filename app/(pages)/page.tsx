"use client"
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { createGoogleAuthorizationURL } from "@/actions/oauth.action";

export default function Home() {
  const router = useRouter();
  async function handleSignin() {
    const res = await createGoogleAuthorizationURL();
    return router.push(res.data!);
  }
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Button onClick={handleSignin}>sign in</Button>
    </div>
  );
}
