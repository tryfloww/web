import { db } from "~/lib/db"

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } })
  const success = user?.id && true

  return { success, user }
} 
