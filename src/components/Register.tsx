import Email from "@mui/icons-material/Email"
import GoogleIcon from "@mui/icons-material/Google"
import Lock from "@mui/icons-material/Lock"
import { Box, Button, Grid, InputLabel,Typography } from "@mui/material"
import { useFormik } from "formik"
import { get } from "radash"
import React from "react"
import * as Yup from "yup"

import { useAuthentication } from "../hooks/useAuthentication"
import { AuthLayout, InputField } from "./AuthLayout"

function Register() {
  const { register } = useAuthentication()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: credentials => register({ credentials, provider: "register" })
  })

  return (
    <AuthLayout type="Sign Up">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3, backgroundColor: "white", padding: "24px", width: "100%" }}
      >
        {["Name", "Email", "Password"].map(field => {
          const lowerField = field.toLowerCase()
          return (
            <React.Fragment key={field}>
              <InputLabel>{field}</InputLabel>
              <InputField
                placeholder={field}
                required
                type={lowerField}
                value={get(formik.values, lowerField)}
                onChange={e => formik.setFieldValue(lowerField, e.target.value)}
                icon={field === "Email" ? <Email /> : <Lock />}
              />
            </React.Fragment>
          )
        })}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Typography variant="body2" color="textSecondary" align="center">
              or
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="button"
          onClick={() => register({ provider: "google" })}
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{ mt: 2 }}
        >
          Sign up with Google
        </Button>
      </Box>
    </AuthLayout>
  )
}

export default Register
