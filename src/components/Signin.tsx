import Email from "@mui/icons-material/Email"
import GoogleIcon from "@mui/icons-material/Google"
import Lock from "@mui/icons-material/Lock"
import { Box, Button, Grid, InputLabel, Typography } from "@mui/material"
import { useFormik } from "formik"
import { signIn } from "next-auth/react"
import { get } from 'radash'
import React from "react"
import * as Yup from "yup"

import { AuthLayout, InputField } from "./AuthLayout"

function Signin() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: async values => {
      const result = await signIn("credentials", {
        redirect: false,
        ...values
      })
      if (result?.error) {
        console.error(result.error)
      }
    }
  })

  return (
    <AuthLayout type="Sign In">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
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
                value={get(formik.values, lowerField)}
                onChange={e => formik.setFieldValue(lowerField, e.target.value)}
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
          type="button"
          onClick={() => signIn("google")}
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{ mt: 2 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </AuthLayout>
  )
}

export default Signin
