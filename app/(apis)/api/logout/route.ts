import { validateRequest, lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.message) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An error occurred while signing out" },
      { status: 500 },
    );
  }
};
