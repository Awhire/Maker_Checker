import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Box>
        <nav>
            <ul>
                <li><NavLink to="/admin/create">Create Admin</NavLink></li>
                <li><NavLink to="/admin/list">Admin Lists</NavLink></li>
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
