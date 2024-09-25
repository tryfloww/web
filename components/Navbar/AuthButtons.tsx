"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createGoogleAuthorizationURL } from "@/actions/oauth.action";
import { useState } from "react";

export const SignInButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleGoogleSignUp() {
    setLoading(true);
    const res = await createGoogleAuthorizationURL();
    if (!res.success || !res.data) {
      setLoading(false);
      return;
    }
    return router.push(res.data);
  }

  return (
    <Button disabled={loading} onClick={handleGoogleSignUp}>
      Sign In
    </Button>
  );
};

export function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button disabled={loading} variant="secondary" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
