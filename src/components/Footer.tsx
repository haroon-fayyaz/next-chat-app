import { APP_NAME } from "@/utils/constants"
import React from "react"

function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      Copyright &copy; {new Date().getFullYear()} {APP_NAME}
    </footer>
  )
}

export default Footer
