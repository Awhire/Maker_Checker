import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../api/api"
import { toast } from "react-toastify";
import { Box, Button, CircularProgress, InputAdornment, TextField, Typography } from "@mui/material";


const validationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
});


const Login = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, args) => {
      try {
        setIsLoading(true);
        const response = await api.signIn(values);
        const isSuccessful = response.data.isSuccessful
        if (isSuccessful) {
          const userData = response.data.data.user;
          const token = response.data.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
          args.resetForm();
          navigate("/dashboard");
          toast.success(response.data.responseMessage);
        } else {
          toast.error(response.data.responseMessage);
          setIsLoading(false)
        }
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          toast.error(error.response.data.responseMessage );
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
    },
  });


  return (
    <Box
      component="div"
      sx={{ width: "100%", height: "100vh", backgroundColor: "primary.light" }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "580px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "20px",
            width: "350px"
          }}
        >
          <Typography variant="h4" sx={{ color: "primary.dark", fontWeight: "700" }}>
            Welcome Back
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: "14px", mt: 1 }}>Please input your login details to get access</Typography>
          <form style={{ marginTop: "20px" }}  onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              id="email"
              data-testid="email"
              InputLabelProps={{
                style: {
                  fontSize: 14,
                },
              }}
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{ mt: "20px", mb: "5px" }}
            />
            <TextField
              fullWidth
              size="small"
              name="password"
              id="password"
              label="Password"
              data-testid="password"
              InputLabelProps={{
                style: {
                  fontSize: 14,
                },
              }}
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{ mt: "20px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      variant="overline"
                      color="primary"
                      fontWeight={500}
                      onClick={handleShowPassword}
                      sx={{ cursor: "pointer" }}
                      className="prevent-select"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              sx={{ mt: 3, mb: 2, p: 1.5 }}
              data-testid="submit-button"
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "white" }} size={20} />
              ) : (
                <Typography
                  color="text.white"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  LOG IN
                </Typography>
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
