import React from "react"

import { APP_NAME } from "@/utils/constants"

function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      Copyright &copy; {new Date().getFullYear()} {APP_NAME}
    </footer>
  )
}

export default Footer
