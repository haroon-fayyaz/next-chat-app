import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

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
