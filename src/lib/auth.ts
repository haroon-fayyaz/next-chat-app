import { hashSync, compareSync } from "bcryptjs"
import User from "@/models/User"
export const hashPassword = (password: string) => hashSync(password, 12)

export const verifyPassword = (password: string, hashedPassword: string) => compareSync(password, hashedPassword)

export const getTokenPayload = (user: User) => {
  const payload = {
    id: user.id,
    email: user.email,
    authProvider: user.authProvider
  }
  return payload
}
