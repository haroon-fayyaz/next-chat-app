import { hashPassword } from "@/lib/auth"
import User from "@/models/User"
import { AUTH_PROVIDERS } from "@/utils/constants"
import { AuthProvider } from "@/utils/types"

export const findUser = async ({ by = "email", value }: { by?: "id" | "email"; value: string }) =>
  User.findOne({ [by]: value })

export const registerUser = ({
  email,
  name,
  password,
  authProvider
}: {
  email: string
  name?: string
  password?: string
  authProvider: AuthProvider
}) => {
  const newUser = new User({
    email,
    name,
    password: password ? hashPassword(password) : "",
    authProvider
  })

  return newUser.save()
}

export const updateUserPassword = (userId: string, newPassword: string) => {
  const hashedPassword = hashPassword(newPassword)

  return User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true })
}
