import { Title } from "@solidjs/meta";
import { Show, createResource, Suspense } from "solid-js";
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

export default function Home() {
  const [data] = createResource(async () => getUser());
  return (
    <>
      <Title>flowww</Title>
      <Suspense>
        <main class="text-center pt-24 p-8">
          Hello,  <Show when={data()?.userId}>
            {data()?.email}
          </Show>
          <Show when={!data()?.userId}>
            Anon
          </Show>
        </main>
      </Suspense>
    </>
  );
}
