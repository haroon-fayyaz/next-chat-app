import { redirect } from "next/navigation"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"

import { AUTH_PROVIDERS } from "@/utils/constants"
import { AuthenticationParams } from "@/utils/types"

export const useAuthentication = () => {
  function handleAuth({ credentials, provider }: AuthenticationParams) {
    const opts = provider === AUTH_PROVIDERS.GOOGLE ? {} : { redirect: false, ...credentials }

    signIn(provider, opts).then(params => {
      const { ok, error } = params || {}
      if (ok) {
        if (provider === AUTH_PROVIDERS.REGISTER) toast.success("Account registered successfully")

        setTimeout(() => {
          redirect("/")
        }, 1000)
      } else if (error) {
        toast.error(error)
      }
    })
  }

  function login({ credentials, provider }: AuthenticationParams) {
    return handleAuth({ credentials, provider })
  }

  function register({ credentials, provider }: AuthenticationParams) {
    return handleAuth({ credentials, provider })
  }

  return { login, register }
}
