import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const RequestLayout = () => {

  return (
    <div>
      <Box>
        <nav>
          <ul>
            <li>
              <NavLink to="/request/create">Create Request</NavLink>
            </li>
            <li>
              <NavLink to="/request/allrequest">View Request</NavLink>
            </li>
          </ul>
        </nav>
      </Box>
      <Box
        component="div"
        sx={{
          p: 2,
          pb: 6,
          pt: 3,
          mt: 3,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#fff",
          color: "text.primary",
          fontFamily: "Work Sans",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default RequestLayout;
