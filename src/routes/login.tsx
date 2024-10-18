import { Title } from "@solidjs/meta";
const Login = () => {
  return (
    <>
      <Title>login | floww</Title>
      <main class="h-screen flex justify-center items-center w-full p-3">
        <div
          class="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:128px_128px]"
        ></div>
        <form class="p-8 flex flex-col z-[10] lg:w-1/3 md:w-1/2 w-full bg-neutral-900">
          <h1 class="text-2xl">login to <span class="text-red-600 font-bold">floww.</span> </h1>
          <p class="mt-2 mb-6 text-neutral-400">welcome back fellow user.</p>
          <button class="bg-neutral-800 text-neutral-400 p-2 flex items-center gap-4 justify-center">
            <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="overflow: visible; color: currentcolor;" height="1em" width="1em"><path fill="currentColor" d="M8.159 6.856V9.6h4.537c-.184 1.178-1.372 3.45-4.537 3.45C5.428 13.05 3.2 10.788 3.2 8s2.228-5.05 4.959-5.05c1.553 0 2.594.663 3.188 1.234l2.172-2.091C12.125.787 10.319-.001 8.16-.001c-4.422 0-8 3.578-8 8s3.578 8 8 8c4.616 0 7.681-3.247 7.681-7.816 0-.525-.056-.925-.125-1.325L8.16 6.855z"></path></svg>
            <p>login with google</p>
          </button>
          <div class="sep my-5 bg-neutral-800 p-[1px]"></div>
          <div class="group flex flex-col gap-2">
            <div class="flex md:flex-row flex-col px-2 gap-[5px] md:gap-3">
              <label class="text-neutral-400" for="username">username</label>
              <p class="text-red-500">user does not exist</p>
            </div>
            <input class="bg-neutral-800 border-none outline-none focus:outline-none p-2" name="username" id="username" autocomplete="off" type="text" />
          </div>
          <div class="group flex mt-4 flex-col gap-2">
            <div class="flex md:flex-row flex-col px-2 gap-[5px] md:gap-3">
              <label class="text-neutral-400" for="password">password</label>
              <p class="text-red-500">passwords do not match</p>
            </div>
            <input class="bg-neutral-800 border-none outline-none focus:outline-none p-2" name="password" id="password" type="password" autocomplete="off" />
          </div>
          <p class="my-5 text-neutral-400">not registered? <a class="text-red-500 underline" href="/register"> create a new account </a></p>
          <button type="submit" class="p-2 bg-red-600">login</button>
        </form>
      </main>
    </>
  )
}

export default Login
