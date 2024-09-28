import { validateRequest } from "@/lib/lucia";
import { SignOutButton, SignInButton } from "./AuthButtons";
import { ModeToggle } from "./ThemeChanger";
export const Navbar = async () => {
  const { user } = await validateRequest();

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-[#f9f9f9] dark:bg-neutral-950">
      <a href="/" className="text-2xl text-neutral-900 dark:text-foreground font-black">
        flow<span className="text-red-600">w.</span>
      </a>
      <div className="flex items-center space-x-3">
        {user && (
          <a
            href="/dashboard"
            className="hover:underline text-neutral-900 mr-4 dark:text-foreground transition"
          >
            Dashboard
          </a>
        )}
        {user && <SignOutButton />}
        {!user && <SignInButton />}
        <ModeToggle />
      </div>
    </div>
  );
};
