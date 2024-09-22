import { ComponentType } from "react"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default function withAuth<P extends {}>(Component: ComponentType<P>) {
  return async function AuthenticatedComponent(props: P) {
    const session = await getServerSession(authOptions)

    if (!session) {
      redirect("/login")
      return null
    }

    return <Component {...props} />
  }
}
