import Footer from "@/components/Footer"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import withAuth from "@/components/withAuth"

function Home() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
      <Footer />
    </div>
  )
}

export default withAuth(Home)
