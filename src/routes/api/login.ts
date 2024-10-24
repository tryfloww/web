import { z } from 'zod';
import { createStore } from "solid-js/store";
import type { FormFields } from "~/validators/login";
import { loginSchema } from "~/validators/login";
import { APIEvent } from "@solidjs/start/server";
import { db } from "~/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSession, getSession } from "~/lib/utils"

export async function POST(event: APIEvent) {
  const data = await event.request.json()
  const session = await getSession()
  const [errors, setErrors] = createStore<Partial<Record<keyof FormFields, string>>>({});
  try {
    loginSchema.parse(data);
    try {
      const { email, password } = data;
      const user = await db.user.findUnique({ where: { email } });

      if (!user || !user.password || !await bcrypt.compare(password, user.password)) {
        let es = errors;
        es["email"] = "wrong password or email"
        setErrors(es)
        const final = {
          errors,
          success: false
        }
        return final
      }

      const accessToken = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET as string);
      await createSession(user!.id, 'local', accessToken);
      await session.update((d) => {
        d.auth = "local"
        d.email = email
        d.token = accessToken
        d.userId = user?.id
      })
      return { success: true, errors: {} }
    } catch (err) {
      let es = errors;
      es["email"] = "could not authenticate"
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
