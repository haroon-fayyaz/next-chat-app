import { AUTH_PROVIDERS } from "@/utils/constants"
import { AuthProvider } from "@/utils/types"
import mongoose, { Schema, Document } from "mongoose"

interface IUser {
  name?: string
  email: string
  password?: string
  authProvider: AuthProvider
  createdAt?: Date
}

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    validate: {
      validator: function (v: string) {
        return this.authProvider !== AUTH_PROVIDERS.CREDENTIALS || (v && v.length > 0)
      },
      message: (props: { value: string }) => `${props.value} is not a valid password!`
    }
  },
  authProvider: {
    type: String,
    enum: Object.values(AUTH_PROVIDERS),
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.models?.User || mongoose.model<IUserDocument>("User", userSchema)

export default User
export type { IUserDocument }
