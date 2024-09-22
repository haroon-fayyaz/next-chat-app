import React from 'react'
import Link from "next/link"
import { AuthLayout } from './AuthLayout'
import { Box, Typography } from "@mui/material"

function Register() {
  return (
    <AuthLayout type="Sign Up">
      <Box
        component="form"
        sx={{ mt: 3, backgroundColor: "white", padding: "24px", width: "100%" }}
      >
      </Box>
    </AuthLayout>
  )
}

export default Register
