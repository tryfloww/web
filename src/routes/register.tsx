import { createStore } from "solid-js/store";
import { Component, createResource } from 'solid-js';
import type { FormFields } from "~/validators/register";
import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { useSession } from "vinxi/http";

async function getUser() {
  "use server";
  try {
    const session = await useSession({
      password: process.env.SESSION_SECRET!
    });
    return session.data;
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}

export const route = {
  load: () => getUser()
};

const Register: Component = () => {
  const navigate = useNavigate();
  const [fields, setFields] = createStore<FormFields>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [data] = createResource(async () => getUser());
  if (data()! != undefined) {
    if (data()!.userId) {
      navigate("/", { replace: true })
    }
  }
  const [errors, setErrors] = createStore<Partial<Record<keyof FormFields, string>>>({});

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFields({ [target.name]: target.value });
  };

  const submit = async (e: Event) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });

    const data = await response.json()
    if (data.success) {
      navigate("/", { replace: true });
    }
    setErrors(data.errors);
  };

  return (
    <>
      <Title>register | floww</Title>
      <main class="min-h-screen flex justify-center items-center w-full p-3">
        <div
          class="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:128px_128px]"
        ></div>
        <div class="p-8 flex flex-col z-[10] lg:w-1/3 md:w-1/2 w-full bg-neutral-900">
          <h1 class="text-2xl">join <span class="text-red-600 font-bold">floww.</span> </h1>
          <p class="mt-2 mb-6 text-neutral-400">enhance your youtube collaboration experience today.</p>
          <button type="button" class="bg-neutral-800 text-neutral-400 p-2 flex items-center gap-4 justify-center">
            <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={{ "overflow": "visible", "color": "currentcolor" }} height="1em" width="1em"><path fill="currentColor" d="M8.159 6.856V9.6h4.537c-.184 1.178-1.372 3.45-4.537 3.45C5.428 13.05 3.2 10.788 3.2 8s2.228-5.05 4.959-5.05c1.553 0 2.594.663 3.188 1.234l2.172-2.091C12.125.787 10.319-.001 8.16-.001c-4.422 0-8 3.578-8 8s3.578 8 8 8c4.616 0 7.681-3.247 7.681-7.816 0-.525-.056-.925-.125-1.325L8.16 6.855z"></path></svg>
            <p>register with google</p>
          </button>
          <form class="w-full" onSubmit={submit}>
            <div class="sep my-5 bg-neutral-800 p-[1px]"></div>
            <div class="group flex flex-col gap-2">
              <div class="flex md:flex-row flex-col px-2 gap-[5px] md:gap-3">
                <label class="text-neutral-400" for="username">username</label>
                {errors.username && <p class="text-red-500">{errors.username}</p>}
              </div>
              <input onInput={handleChange} class="bg-neutral-800 border-none outline-none focus:outline-none p-2" name="username" id="username" autocomplete="off" type="text" />
            </div>
            <div class="group flex flex-col gap-2 mt-4">
              <div class="flex md:flex-row flex-col px-2 gap-[5px] md:gap-3">
                <label class="text-neutral-400" for="email">email</label>
                {errors.email && <p class="text-red-500">{errors.email}</p>}
              </div>
              <input onInput={handleChange} class="bg-neutral-800 border-none outline-none focus:outline-none p-2" name="email" id="email" autocomplete="off" type="text" />
            </div>
            <div class="group flex mt-4 flex-col gap-2">
              <div class="flex md:flex-row flex-col px-2 gap-[5px] md:gap-3">
                <label class="text-neutral-400" for="password">password</label>
                {errors.password && <p class="text-red-500">{errors.password}</p>}
              </div>
              <input onInput={handleChange} class="bg-neutral-800 border-none outline-none focus:outline-none p-2" name="password" id="password" type="password" autocomplete="off" />
            </div>
            <div class="group flex mt-4 flex-col gap-2">
              <div class="flex md:flex-row flex-col px-2 gap-[5px] md:gap-3">
                <label class="text-neutral-400" for="confirmPassword">confirm password</label>
                {errors.confirmPassword && <p class="text-red-500">{errors.confirmPassword}</p>}
              </div>
              <input onInput={handleChange} class="bg-neutral-800 border-none outline-none focus:outline-none p-2" name="confirmPassword" id="confirmPassword" type="password" autocomplete="off" />
            </div>
            <p class="mt-5 mb-5 text-neutral-400">already registered? <a class="text-red-500 underline" href="/login">log in to existing account </a></p>
            <button type="submit" class="p-2 w-full bg-red-600">register</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
