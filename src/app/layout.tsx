import "@/styles/globals.scss"

import { Montserrat } from "next/font/google"

import { AuthProvider } from "@/components/AuthProvider"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${montserrat.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
