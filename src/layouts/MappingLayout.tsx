import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const user = localStorage.getItem("user");
  let userRole: any;
  if (user) {
    const userObj = JSON.parse(user);
    userRole = userObj.admin_role;
  }

  return (
    <div>
      <Box>
        <nav>
            <ul>
              {userRole !== "support" && (
                <>
                <li><NavLink to="/mapping/create">Create</NavLink></li>
                <li><NavLink to="/mapping/allmapping">All Mapping</NavLink></li>
                </>
                )
              }
              <li><NavLink to="/mapping/viewmapping">View Mapping</NavLink></li>
            </ul>  
        </nav>
      </Box>
      <Box component='div' sx={{p:5, pb:6, pt: 3, mt: 3, width: '100%', minHeight: "100vh",  backgroundColor: "#fff", color: "text.primary", fontFamily: "Work Sans"}}>
            <Outlet />
      </Box>
    </div>
  );
};

export default AdminLayout;
