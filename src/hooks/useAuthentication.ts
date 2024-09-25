import { signIn } from "next-auth/react"

export const useAuthentication = () => {
  async function login({
    credentials,
    provider
  }: {
    credentials?: { email: string; password: string }
    provider: "credentials" | "google"
  }) {
    if (provider === "google") return await signIn("google")

    await signIn(provider, { redirect: false, ...credentials })
  }

  async function register({
    credentials,
    provider
  }: {
    credentials?: { name: string; email: string; password: string }
    provider: "register" | "google"
  }) {
    if (provider === "google") return await signIn("google")

    await signIn(provider, { redirect: false, ...credentials })
  }

  return { login, register }
}
