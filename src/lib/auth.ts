import { compareSync, hashSync } from "bcryptjs"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { connectToDatabase } from "@/lib/db"
import { IUserDocument } from "@/models/User"
import { findUser, registerUser } from "@/services/userService"
import { AUTH_PROVIDERS } from "@/utils/constants"

export const hashPassword = (password: string) => hashSync(password, 12)

export const verifyPassword = (password: string, hashedPassword: string) => compareSync(password, hashedPassword)

export const getTokenPayload = (user: IUserDocument) => {
  const payload = {
    id: user.id,
    email: user.email,
    authProvider: user.authProvider
  }
  return payload
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) return null

        await connectToDatabase()
        const user = await findUser({ by: "email", value: credentials.email })
        if (!user) throw new Error("No account with this email exist")
        if (!verifyPassword(credentials.password, user.password)) throw new Error("Invalid Credentials")

        return getTokenPayload(user)
      }
    }),
    CredentialsProvider({
      id: "register",
      name: "register",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) return null
          await connectToDatabase()

          const user = await findUser({ by: "email", value: credentials.email })
          if (user) throw new Error("User with this email already exists")

          const newUser = await registerUser({ ...credentials, authProvider: AUTH_PROVIDERS.CREDENTIALS })
          return getTokenPayload(newUser)
        } catch (error) {
          return Promise.reject(error)
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "profile email"
        }
      }
    })
  ],
  callbacks: {
    async signIn(opts) {
      try {
        const { account, profile } = opts

        if ([AUTH_PROVIDERS.CREDENTIALS, AUTH_PROVIDERS.REGISTER].includes(account.provider)) return true
        if (!account || !profile) return false

        const { email, name } = profile
        if (!email) return false

        await connectToDatabase()

        let user = await findUser({ by: "email", value: email })
        if (!user) user = await registerUser({ email, name, authProvider: account.provider })
        return true
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return false
      }
    },
    async session({ session }) {
      if (!session?.user?.email) return Promise.reject("User not found")

      const dbUser = await findUser({ by: "email", value: session.user.email })
      if (!dbUser) return Promise.reject("User not found")

      session.user = { ...session.user, ...getTokenPayload(dbUser) }
      return Promise.resolve(session)
    }
  },
  pages: {
    signIn: "/login"
  }
}
