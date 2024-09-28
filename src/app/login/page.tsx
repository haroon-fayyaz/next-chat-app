"use client"

import Signin from "@/components/Signin"
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

function Login() {
  useAuthRedirect(false);

  return <Signin />
}

export default Login
