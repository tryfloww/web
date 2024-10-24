import { A, useLocation } from "@solidjs/router";
import { Show, createResource, Suspense } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { getSession } from "~/lib/utils";
async function getUser() {
  "use server";
  try {
    const session = await getSession()
    return session.data;
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}

export const route = {
  load: () => getUser()
};

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data] = createResource(() => location.pathname, async () => getUser());
  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav class="z-[20] fixed top-0 left-0 w-full py-5 px-8 flex justify-between items-center">
        <div class="flex items-center">
          <A href="/" activeClass="text-xl">
            flow<span class="text-red-500 font-bold">w.</span>
          </A>
        </div>
        <div class="flex items-center gap-5">

          <Show when={data()?.userId}>
            <a href="/dash">/dash</a>
            <a href="/prof">/prof</a>
            <button onClick={logout} class="px-3 py-[4px] bg-neutral-800 text-white">
              log out
            </button>
          </Show>
          <Show when={!data()?.userId}>
            <a href="/login" class="px-3 py-[4px] bg-red-600 text-white">
              log in
            </a>
          </Show>
        </div>
      </nav >
    </Suspense>
  );
}

