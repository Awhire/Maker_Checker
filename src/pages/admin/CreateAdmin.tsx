import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api/api";
import { toast } from "react-toastify";

import {
  Box,
  TextField,
  Button,
  CircularProgress,
  InputLabel,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const validationSchema = yup.object({
  name: yup.string().required("Email is required"),
  admin_role: yup.string().required("Role is required"),
  email: yup
    .string()
    .email("Must be a valid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const CreateAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      admin_role: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, args) => {
        setIsLoading(true);
      try {
        const response = await api.createAccount(values);
        const isSuccessful = response.data.isSuccessful
        if (isSuccessful) {
          args.resetForm();
          toast.success(response.data.responseMessage);
          localStorage.removeItem("tableData")
        } else {
          toast.error(response.data.responseMessage);
    }
} catch (error: any) {
    if (error.response) {
          toast.error(error.response.data.responseMessage );
        } else {
              toast.error("Something went wrong, please try again");
            }
        }
        setIsLoading(false)
    },
  });


  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ color: "primary.dark", fontWeight: "700" }}
      >
        Create Account
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: "14px", mt: 1 }}>
        Create account for new admin to get access
      </Typography>
      <form
        style={{ marginTop: "20px", width: "500px" }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          size="small"
          label="Name"
          id="name"
          data-testid="name"
          InputLabelProps={{
            style: {
              fontSize: 14,
            },
          }}
          name="name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{ mt: "20px", mb: "5px" }}
        />

        <FormControl sx={{ mt: 1.5 }} fullWidth size="small">
          <InputLabel id="demo-select-small-label" sx={{ fontSize: 14 }}>Role</InputLabel>
          <Select
            labelId="demo-select-small-label"
            name="admin_role"
            id="admin_role"  
            label="Role"
            value={formik.values.admin_role}
            onBlur={formik.handleBlur}
            onChange={(event) => {
                formik.setFieldValue("admin_role", event.target.value);  // Update the role field in formik
            }}
            sx={{ fontSize: 16 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="support">Support</MenuItem>
            <MenuItem value="supervisor">Supervisor</MenuItem>
            <MenuItem value="superadmin">Super Admin</MenuItem>
          </Select>
        </FormControl>

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
          type="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{ mt: "20px" }}
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
              Register
            </Typography>
          )}
        </Button>
      </form>
    </Box>
  );
};

export default CreateAdmin;
