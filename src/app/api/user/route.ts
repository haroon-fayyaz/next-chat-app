import { NextResponse } from "next/server"

import { useDatabase } from "@/hooks/useDatabase"
import User from "@/models/User"

export async function GET() {
  const withDatabase = useDatabase()

  try {
    const data = await withDatabase(async () => {
      const users = await User.find()
      return users
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
