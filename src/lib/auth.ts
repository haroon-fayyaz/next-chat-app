import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { connectToDatabase } from "@/lib/db"
import User, { IUserDocument } from "@/models/User"
import { AUTH_PROVIDERS } from "@/utils/constants"
import { findUser, registerUser } from "@/services/userService"
import { hashSync, compareSync } from "bcryptjs"

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
        if (user && verifyPassword(credentials.password, user.password)) return getTokenPayload(user)

        return null
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
    async signIn({ account, profile }) {
      try {
        if (!account || !profile) return false
        if (account.provider === AUTH_PROVIDERS.CREDENTIALS) return true

        const { email, name } = profile
        if (!email) return false

        await connectToDatabase()

        let user = await findUser({ by: "email", value: email })
        if (!user) user = await registerUser({ email, name, authProvider: account.provider })

        return true
      } catch (error) {
        return false
      }
    },
    async session({ session, token, user }) {
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
