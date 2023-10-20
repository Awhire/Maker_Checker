import { Box } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Box>
        <nav>
            <ul>
                <li><Link to="/admin/create">Create Admin</Link></li>
                <li><Link to="/admin/list">Admin Lists</Link></li>
            </ul>
          
        </nav>
      </Box>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
