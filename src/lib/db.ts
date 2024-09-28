import mongoose from "mongoose"

const MAX_RETRIES = 3
const RETRY_DELAY = 5000 // 5 seconds

const connectWithRetry = async (retryCount = 0) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    })
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error(`MongoDB connection attempt ${retryCount + 1} failed:`, error)
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      await connectWithRetry(retryCount + 1)
    } else {
      console.error("Max retries reached. Unable to connect to MongoDB")
      throw error
    }
  }
}

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI || mongoose.connection.readyState >= 1) {
    return
  }

  await connectWithRetry()
}
