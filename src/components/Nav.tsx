import { A } from "@solidjs/router";

export default function Nav() {
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
