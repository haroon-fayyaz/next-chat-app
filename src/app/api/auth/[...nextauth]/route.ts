import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { authOptions, getTokenPayload, verifyPassword } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"
import { AUTH_PROVIDERS } from "@/utils/constants"
import { findUser, registerUser } from "@/services/userService"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
