import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import Footer from "@/components/Footer"
import { authOptions } from "@/lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
      <Footer />
    </div>
  )
}
