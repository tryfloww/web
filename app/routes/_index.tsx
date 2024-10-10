import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "flowww" },
    { name: "description", content: "welcome to flowww." },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
    </div>
  );
}
