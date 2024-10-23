import { Title } from "@solidjs/meta";
import { Show, createResource, Suspense } from "solid-js";
import { getSession } from "~/lib/utils";
import { getUserByEmail } from "~/services/user";

async function getUser() {
  "use server";
  try {
    const session = await getSession()
    const user = await getUserByEmail(session.data.email!)
    return user;
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
          <Show when={data()?.success}>
            <div class="inline-flex gap-4 items-center">
              <img src={`/api/avatar/${data()?.user?.name}`} alt="" class="w-10 rounded-full h-10" />
              <p>
                {data()?.user?.name}
              </p>
            </div>
          </Show>
          <Show when={!data()?.success}>
            Hello, Anon
          </Show>
        </main>
      </Suspense>
    </>
  );
}
