import { A } from "@solidjs/router";
import { createAsync, cache } from "@solidjs/router";
import { useSession } from "vinxi/http";

const getUsers = cache(async () => {
  "use server";
  const session = await useSession({
    password: process.env.SESSION_SECRET!
  });
  console.log(session.data)
  return session.id
}, "users");

export const route = {
  preload: () => getUsers(),
};


export default function Nav() {
  const users = createAsync(() => getUsers());
  console.log(users())
  return (
    <nav class="z-[20] fixed top-0 left-0 w-full py-5 px-8 flex justify-between items-center">
      <div class="flex items-center">
        <A href="/" activeClass="text-xl">flow<span class="text-red-500 font-bold">w.</span></A>
      </div>

      <div class="flex items-center gap-5">
        <A href="/dash">/dash</A>
        <A href="/prof">/prof</A>
        <a href="/login" class="px-3 py-[4px] bg-red-600 text-white">log in</a>
      </div>
    </nav >
  );
}
