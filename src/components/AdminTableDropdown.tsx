import { useState } from "react";
import {
  Typography,
  IconButton,
  Popover,
  Box,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

const AdminTableDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleMenuItemClick = (value: string) => {
    if (value === "view") {
        navigate("details")
    }
  }


  const menuContent = (
    <Box sx={{ py: 0.5 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          px: 2,
          py: 0.5,
          "&:hover": {
            backgroundColor: "primary.light",
            cursor: "pointer",
          },
        }}
        onClick={() => handleMenuItemClick("view")}
      >
        <Typography fontWeight={400} fontSize="14px">
          View Admin
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          px: 2,
          py: 0.5,
          "&:hover": {
            backgroundColor: "primary.light",
            cursor: "pointer",
          },
        }}
      >
        <Typography fontWeight={400} fontSize="14px">
          Update Role
        </Typography>
      </Box>
      
    </Box>
  );

  return (
    <>
      <IconButton
        aria-labelledby={Boolean(anchorEl) ? "simple-popover" : undefined}
        aria-label="more"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={(e) => handleMenuOpen(e)}
      >
        <MoreVertIcon />
      </IconButton>
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
        {menuContent}
      </Popover>
    </>
  );
};

export default AdminTableDropdown;
