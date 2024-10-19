import { z } from 'zod';
import { createStore } from "solid-js/store";
import type { FormFields } from "~/validators/register";
import { registerSchema } from "~/validators/register";
import { APIEvent } from "@solidjs/start/server";
import { db } from "~/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSession } from "~/lib/utils"

export async function POST(event: APIEvent) {
  const data = await event.request.json()
  const [errors, setErrors] = createStore<Partial<Record<keyof FormFields, string>>>({});
  try {
    registerSchema.parse(data);
    const { email, username, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await db.user.create({
        data: { email, password: hashedPassword, name: username },
      });
      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
      await createSession(user.id, 'local', accessToken);
      event.response.headers.set('Set-Cookie', `jwt=${accessToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`);
      return {
        errors: [], success: true
      }
    } catch (err) {
      let es = errors;
      es["username"] = "| user with this account / email exists"
      setErrors(es)
      const final = {
        errors,
        success: false
      }
      return final
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      const newErrors: Partial<Record<keyof FormFields, string>> = {};
      err.errors.forEach((e) => {
        if (e.path[0]) {
          newErrors[e.path[0] as keyof FormFields] = e.message;
        }
      });
      setErrors(newErrors);
    }
  }

  const final = {
    errors,
    success: false
  }

  return final
} 
