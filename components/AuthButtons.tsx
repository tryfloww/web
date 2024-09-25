"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { createGoogleAuthorizationURL } from "@/actions/oauth.action";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export const SignInButton = () => {
  const router = useRouter();
  async function handleGoogleSignUp() {
    const res = await createGoogleAuthorizationURL();
    if (!res.success || !res.data) {
      return;
    }
    return router.push(res.data);
  }

  return (
    <Button onClick={handleGoogleSignUp} variant="default" size="lg">
      <EnvelopeOpenIcon className="mr-2" /> Sign in with Google
    </Button>
  );
};

export function SignOutButton() {
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
