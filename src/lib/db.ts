import mongoose from "mongoose"

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI || mongoose.connection.readyState >= 1) {
    return
  }

  await mongoose.connect(process.env.MONGODB_URI)
}

export { connectToDatabase }
