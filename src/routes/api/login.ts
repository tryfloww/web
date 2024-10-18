import { z } from 'zod';
import { createStore } from "solid-js/store";
import type { FormFields } from "~/validators/login";
import { loginSchema } from "~/validators/login";
import { APIEvent } from "@solidjs/start/server";

export async function POST(event: APIEvent) {
  const data = await event.request.json()
  const [errors, setErrors] = createStore<Partial<Record<keyof FormFields, string>>>({});
  try {
    console.log(loginSchema.parse(data));
    // do further checking
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
