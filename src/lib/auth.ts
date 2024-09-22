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

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDatabase()

        const user = await findUser({ by: "email", value: credentials.email })
        if (user && verifyPassword(credentials.password, user.password)) return getTokenPayload(user)

        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        if (account.provider === AUTH_PROVIDERS.CREDENTIALS) return true
        const { email, name } = profile
        await connectToDatabase()

        let user = await findUser({ by: "email", value: email })
        if (!user) user = await registerUser({ email, name, authProvider: account.provider })

        return true
      } catch (error) {
        return false
      }
    },
    async session({ session, token, user }) {
      console.log("session: ", session)
      console.log("token: ", token)
      console.log("user: ", user)
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
