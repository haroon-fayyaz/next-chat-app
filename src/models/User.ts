import mongoose from "mongoose"
import { AUTH_PROVIDERS } from "@/utils/constants"

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    validate: {
      validator: function (v) {
        return this.authProvider !== AUTH_PROVIDERS.CREDENTIALS || (v && v.length > 0)
      },
      message: props => `${props.value} is not a valid password!`
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

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
