import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string()
    .min(4, "must be at least 4 characters")
    .max(32, "must be at most 32 characters")
    .regex(/^[a-zA-Z0-9_.-]+$/, "can only contain a-z,A-Z,0-9,_-."),
  email: z.string().email("invalid address"),
  password: z.string()
    .min(4, "must be at least 4 characters")
    .max(32, "must be at most 32 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/,
      "at least 1 A-Z, a-z, 0-9, and symbol"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "does not match",
  path: ["confirmPassword"],
});

export type FormFields = z.infer<typeof registerSchema>;
