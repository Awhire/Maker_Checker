import { NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  List,
  CssBaseline,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MenuItems from "./MenuItems";
import { useStateValue } from "../../context/Context";


const drawerWidth = 225;

const SideBar = () => {
  const { mobileSideBarNav, updateMobileSideBarNav } = useStateValue();
  const location = useLocation();
  const theme = useTheme();

  const pathname = location.pathname;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    updateMobileSideBarNav(!mobileSideBarNav);
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        open={mobileSideBarNav ? true : false}
        variant={isMobile ? "temporary" : "permanent"}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <List sx={{ mt: 10 }}>
          {MenuItems.map((item: any, index: any) => (
            <Box key={index}>
              {item.categories && (
                <Typography
                  sx={{
                    mt: 2.5,
                    pl: "15px",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "text.primary",
                  }}
                >
                  {item.categories}
                </Typography>
              )}
              <ListItem
                disablePadding
                dense
                component={NavLink}
                to={item.path}
                sx={{ color: "primary", py: "2px" }}
                onClick={handleDrawerToggle}
              >
                <ListItemButton selected={pathname.includes(item.path)}>
                  <ListItemIcon sx={{ minWidth: "35px" }}>
                    <img src={item.icon} alt={item.name} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: pathname.includes(item.path) ? "500" : "400",
                      color: pathname.includes(item.path) ? "primary" : "",
                    }}
                    sx={{ color: "text.primary" }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
