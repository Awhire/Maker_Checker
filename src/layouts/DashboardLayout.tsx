import { Outlet } from "react-router-dom";
import SideBar from "../components/NavigationBar/SideBar";
import TopBar from "../components/NavigationBar/TopBar";
import { Box } from "@mui/material";

const DashboardLayout = () => {
  return (
    <Box sx={{overflow: "hidden"}}>
      <TopBar />
      <Box
        sx={{ display: "flex" }}
      >
        <SideBar />
          <Box component='div' sx={{p:5, pb:6, pt: 12, width: '100%', minHeight: "100vh",  backgroundColor: "#213F7D0F", color: "text.primary", fontFamily: "Work Sans"}}>
            <Outlet />
          </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
