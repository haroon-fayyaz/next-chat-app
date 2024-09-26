import { connectToDatabase } from "@/lib/db"

export function useDatabase() {
  return async function withDatabase<T>(callback: () => Promise<T>): Promise<T> {
    try {
      await connectToDatabase()
      return await callback()
    } catch (error) {
      console.error("Database operation failed:", error)
      throw new Error("A database error occurred. Please try again later.")
    }
  }
}
