import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function withAuth(Component) {
  return async function AuthenticatedComponent() {
    const session = await getServerSession(authOptions)

    if (!session) {
      redirect("/login")
      return null
    }

    return <Component />
  }
}
