"use client"

import { redirect } from "next/navigation"
import Signin from "@/components/Signin"
import { useSession } from "next-auth/react"

function Login() {
  const session = useSession()

  if (session?.data?.user) {
    redirect("/")
  }

  return <Signin />
}

export default Login
