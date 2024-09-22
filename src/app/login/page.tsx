"use client"

import { redirect } from "next/navigation"
import Signin from "@/components/Signin"
import { useSession } from "next-auth/react"
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

function Login() {
  useAuthRedirect(false);

  return <Signin />
}

export default Login
