"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/login" })
  }, [])

  return <></>
}
