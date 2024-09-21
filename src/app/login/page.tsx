"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { Button, TextField, Typography, Container, Box, Grid, InputAdornment, InputLabel } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import Email from "@mui/icons-material/Email"
import Lock from "@mui/icons-material/Lock"
import Link from "next/link"

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      redirect: false,
      ...credentials
    })

    if (result?.error) {
      console.error(result.error)
    } else {
      console.log("Sign-in successful")
    }
  }

  return (
    <Container className="h-screen flex flex-col items-center justify-center" component="div" maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ color: "#1F5993", fontWeight: "bold", mb: 4 }}>
          Connecto
        </Typography>
        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          Sign in to your account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSignIn}
          sx={{ mt: 3, backgroundColor: "white", padding: "24px", width: "100%" }}
        >
          {["Email", "Password"].map(field => {
            const lowerField = field.toLowerCase()
            return (
              <React.Fragment key={field}>
                <InputLabel>{field}</InputLabel>
                <InputField
                  placeholder={field}
                  required
                  type={lowerField}
                  value={credentials[lowerField]}
                  onChange={e => setCredentials({ ...credentials, [lowerField]: e.target.value })}
                  icon={field === "Email" ? <Email /> : <Lock />}
                />
              </React.Fragment>
            )
          })}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2" color="textSecondary" align="center">
                or
              </Typography>
            </Grid>
          </Grid>
          <Button
            onClick={() => signIn("google")}
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mt: 2 }}
          >
            Sign in with Google
          </Button>
        </Box>
        <Typography className="mt-8" variant="p" align="center" sx={{ color: "#495057" }}>
          Don&apos;t have an account ?{" "}
          <Link className="text-[#7269ef] font-semibold" href="/signup">
            Signup now
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

interface InputFieldProps extends TextFieldProps {
  icon: React.ReactNode
}

function InputField({ icon, ...props }: InputFieldProps) {
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

export default Login
