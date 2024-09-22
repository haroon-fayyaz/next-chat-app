import { Box, Container, Typography, TextField, InputAdornment, TextFieldProps } from "@mui/material"
import Link from "next/link"
import React from "react"

export interface IAuthLayoutProps {
  type: "Sign In" | "Sign Up"
  children: React.ReactNode
}

interface InputFieldProps extends Omit<TextFieldProps, "icon"> {
  icon: React.ReactNode
}

const SIGN_IN_FORM_OPTS = {
  title: "Sign in to your account",
  navText: "Don't have an account?",
  navLink: "/register",
  navLinkText: "Signup now"
}

const SIGN_UP_FORM_OPTS = {
  title: "Sign up to your account",
  navText: "Already have an account?",
  navLink: "/login",
  navLinkText: "Signin now"
}

export const AuthLayout: React.FC<IAuthLayoutProps> = ({ type, children }) => {
  const FORM_OPTS = type === "Sign In" ? SIGN_IN_FORM_OPTS : SIGN_UP_FORM_OPTS

  return (
    <Container
      component="div"
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ color: "#1F5993", fontWeight: "bold", mb: 4 }}>
          Connecto
        </Typography>
        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          {FORM_OPTS.title}
        </Typography>
        {children}
        <Typography className="mt-8" variant="body2" align="center" sx={{ color: "#495057" }}>
          {FORM_OPTS.navText}&nbsp;
          <Link className="text-[#7269ef] font-semibold" href={FORM_OPTS.navLink}>
            {FORM_OPTS.navLinkText}
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export const InputField = ({ icon, ...props }: InputFieldProps) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment className="p-1" position="start">
            {icon}
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
}
