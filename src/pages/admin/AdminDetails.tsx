import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";



const AdminDetails = () => {
  const { state } = useLocation();
  const userID = state;

  const [adminRole, setAdminRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await api.getAdminDetails(userID);
        console.log(response)
        const isSuccessful = response.data.isSuccessful;
        if (isSuccessful) {
          const data = response.data.data;
          setUserDetails(data);
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
  }, [userID]);


  const updateRole = async() => {
    const payload = {
        admin_role: adminRole,
        admin_id: userID,
    };
      try {
        setButtonLoading(true);
        const response = await api.updateAdminRole(payload);
        const isSuccessful = response.data.isSuccessful
        if(isSuccessful) { 
            const data = response.data.data 
            setUserDetails(data);
            setButtonLoading(false);
            toast.success(response.data.responseMessage)
            localStorage.removeItem("tableData")
        } else {
            toast.error(response.data.responseMessage)
        }
    } catch (error: any) {
        if(error.response) {
            console.log(error);
            toast.error(error.response.data.responseMessage)
        }else {
            toast.error("Something went wrong, please try again");
        }
    }
    setButtonLoading(false);
  }

  return (
    <Box component="div">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h3 style={{ color: "#FF5733" }}>Details</h3>

          <Box sx={{ fontSize: "15px" }}>
            <p>
              <span style={{ fontWeight: 600, paddingRight: "20px" }}>
                Name:
              </span>
              {userDetails.name}
            </p>
            <p>
              <span style={{ fontWeight: 600, paddingRight: "20px" }}>
                Email:
              </span>
              {userDetails.email}
            </p>
            <p style={{ textTransform: "capitalize" }}>
              <span style={{ fontWeight: 600, paddingRight: "20px" }}>
                Admin Role:
              </span>
              {userDetails.admin_role}
            </p>
            <p style={{ textTransform: "capitalize" }}>
              <span style={{ fontWeight: 600, paddingRight: "20px" }}>
                Added By:
              </span>
              {userDetails.added_by_name
                ? userDetails.added_by_name
                : "System"}
            </p>
          </Box>

          <Typography sx={{ color: "text.secondary", fontSize: "14px", mt: 6 }}>
            Update Roles
          </Typography>

          <form>
            <FormControl
              sx={{ mt: 1.5, width: "300px" }}
              fullWidth
              size="small"
            >
              <InputLabel id="demo-select-small-label" sx={{ fontSize: 14 }}>
                Role
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                name="admin_role"
                id="admin_role"
                label="Role"
                value={adminRole}
                onChange={(event) => {
                    setAdminRole(event.target.value);
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
            <br />
            <Button
              type="button"
              variant="contained"
              fullWidth
              disableElevation
              onClick={updateRole}
              disabled={!adminRole || buttonLoading}
              sx={{ mt: 3, mb: 2, p: 1.5, width: "300px" }}
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
                  Update Role
                </Typography>
              )}
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};

export default AdminDetails;
