import { useState, useEffect } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const validationSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Must be a valid email format")
    .required("Email is required"),
});

const CreateRequest = () => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState<any>("");
  const [requestType, setRequestType] = useState<any>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await api.getAllUsersProfile();
        console.log(response);
        const isSuccessful = response.data.isSuccessful;
        if (isSuccessful) {
          const data = response.data.data;
          setData(data);
          setIsLoading(false);
        } else toast.error("Error in User Details");
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else toast.error("Something went wrong, please try again");
      }
    };

    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, args) => {},
  });

  const handleSubmit = async () => {
    console.log(requestType);
    const payload = {
      user_id: userInfo ? userInfo.id : null,
      initiator_comment: comment,
      request_type: requestType,
      request_data: {
        first_name: "",
        last_name: "",
        email: "",
      },
    };

    if (requestType === "delete") {
      payload.request_data = userInfo;
    } else {
      const additioalData = {
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
        email: formik.values.email,
      };

      payload.request_data = additioalData;
    }

    console.log(payload);

    try {
      setButtonLoading(true);
      const response = await api.createRequest(payload);
      console.log(response);
      const isSuccessful = response.data.isSuccessful;
      if (isSuccessful) {
        // Clear the form values
        formik.resetForm();
        setComment("");
        setRequestType("");
        setUserInfo(null);
          
        toast.success(response.data.responseMessage)
        setButtonLoading(false);
      } else toast.error("Error in User Details");
    } catch (error: any) {
      setButtonLoading(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else toast.error("Something went wrong, please try again");
    }
  };

  const handleRequestType = (e: any) => {
    const value = e.target.value;
    setRequestType(value);
    if (value === "create") {
      setUserInfo(null);
    }
  };

  const handleUserInfor = (newValue: any) => {
    setUserInfo(newValue);
    if (newValue && requestType === "update") {
      formik.values.first_name = newValue.first_name;
      formik.values.last_name = newValue.last_name;
      formik.values.email = newValue.email;
      console.log("in here");
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Typography sx={{ color: "text.secondary", fontSize: "14px", mt: 1 }}>
            Create Request
          </Typography>

          <form style={{ marginTop: "20px", width: "400px" }}>
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">
                Request Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={requestType}
                label="Request Type"
                onChange={handleRequestType}
              >
                <MenuItem value="create">Create</MenuItem>
                <MenuItem value="update">Update</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
              </Select>
            </FormControl>
            {requestType && requestType !== "create" && (
              <Autocomplete
                options={data}
                getOptionLabel={(option: any) => option.email}
                value={userInfo}
                onChange={(e, newValue) => {
                  handleUserInfor(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search Email" />
                )}
                sx={{ marginTop: "20px" }}
              />
            )}

            {(requestType && requestType === "create") ||
            (userInfo && requestType === "update") ? (
              <>
                <TextField
                  id="outlined-multiline-flexible"
                  label="First Name"
                  name="first_name"
                  multiline
                  maxRows={4}
                  fullWidth
                  sx={{ marginTop: "20px" }}
                  value={formik.values.first_name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <Typography color="error.main" sx={{ fontSize: "13px" }}>
                  {formik.errors.first_name && formik.touched.first_name ? (
                    <span>{formik.errors.first_name}</span>
                  ) : null}
                </Typography>

                <TextField
                  id="outlined-multiline-flexible"
                  label="Last Name"
                  name="last_name"
                  multiline
                  maxRows={4}
                  fullWidth
                  sx={{ marginTop: "20px" }}
                  value={formik.values.last_name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <Typography color="error.main" sx={{ fontSize: "13px" }}>
                  {formik.errors.last_name && formik.touched.last_name ? (
                    <span>{formik.errors.last_name}</span>
                  ) : null}
                </Typography>

                <TextField
                  id="outlined-multiline-flexible"
                  label="Email"
                  name="email"
                  multiline
                  maxRows={4}
                  fullWidth
                  sx={{ marginTop: "20px" }}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <Typography color="error.main" sx={{ fontSize: "13px" }}>
                  {formik.errors.email && formik.touched.email ? (
                    <span>{formik.errors.email}</span>
                  ) : null}
                </Typography>
              </>
            ) : null}

            {requestType && (
              <TextField
                id="outlined-multiline-flexible"
                label="Comment"
                multiline
                maxRows={4}
                fullWidth
                sx={{ marginTop: "20px" }}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            )}

            <Button
              type="button"
              variant="contained"
              fullWidth
              disableElevation
              onClick={handleSubmit}
              disabled={((requestType !== "create") && !(userInfo && comment)) || ((requestType !== "delete") && !(formik.isValid && formik.dirty && comment)) || buttonLoading}
              sx={{ mt: 3, mb: 2, p: 1.5 }}
              data-testid="submit-button"
            >
              {buttonLoading ? (
                <CircularProgress sx={{ color: "white" }} size={20} />
              ) : (
                <Typography
                  color="text.white"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Create
                </Typography>
              )}
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};

export default CreateRequest;
