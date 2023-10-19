import { useState } from "react";
import {
  Typography,
  Toolbar,
  CssBaseline,
  AppBar,
  Box,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


import { useStateValue } from "../../context/Context";
import TopDropdown from "./TopDropdown";

import dropdown from "../../assets/topbar/dropdown.svg";



const TopBar = () => {
  const { mobileSideBarNav, updateMobileSideBarNav } = useStateValue();

  const [anchorEl, setAnchorEl] = useState(null);

  const user = localStorage.getItem("user");

  if (user) {
    const userObj = JSON.parse(user);
    // var profileImg = userObj.profilePicUrl;
    var fullName = userObj.fullName;
    // var userFirstName = fullName.split(" ")[0];
  }

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    updateMobileSideBarNav(!mobileSideBarNav);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  

  function stringAvatar(name: string) {
    const value = name ? name : " ";
    return {
      children: `${value.split(" ")[0][0]}${value.split(" ")[1][0]}`,
    };
  }

  return (
    <Box sx={{}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className="elevation1"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "text.white",
          height: "70px",
          borderBottom: "1px light black",
        }}
      >
        <Toolbar>
          <Box
            component="div"
            sx={{
              color: "text.secondary",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              component="div"
              sx={{ mt: 1,  }}
            >
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 10, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" sx={{ color: '#FF5733', fontWeight: '900', display: {xs: 'none', md: 'block'} }}>V</Typography>
            </Box>

           

            <Box component="div">
              <Box
                sx={{
                  pl: 6,
                  pr: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                  
                  
                  <Box
                    component="div"
                    onClick={(e) => handleMenuOpen(e)}
                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                  >
                      <Box component="div">
                      
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "primary.main",
                          }}
                          {...stringAvatar(fullName)}
                        />
                      
                    </Box>

                    <Typography
                      component="p"
                      pl={0.5}
                      fontWeight={500}
                      className="prevent-select"
                    >
                      {fullName}
                    </Typography>
                    <IconButton>
                      <img src={dropdown} alt="icon" />
                    </IconButton>
                  </Box>
                  <Popover
                    id={Boolean(anchorEl) ? "simple-popover" : undefined}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                    elevation={1}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <TopDropdown closeMenu={handleMenuClose}  />
                  </Popover>
                </Box>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
