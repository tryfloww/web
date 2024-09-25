import { validateRequest } from "@/lib/lucia";
import { SignOutButton, SignInButton } from "./AuthButtons";
export const Navbar = async () => {
  const { user } = await validateRequest();

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-neutral-900">
      <a href="/" className="text-2xl font-black">
        flow<span className="text-red-600">w.</span>
      </a>
      <div className="flex items-center space-x-8">
        {user && (
          <a
            href="/dashboard"
            className="text-foreground hover:underline transition"
          >
            Dashboard
          </a>
        )}
        {user && <SignOutButton />}
        {!user && <SignInButton />}
      </div>
    </div>
  );
};
