import { useState } from "react";
import {
  Typography,
  IconButton,
  Popover,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const RequestTableDropdown = ({ rowData, reload, setReload }: any) => {
  const row = rowData;

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  

  const handleMenuOpen = (event: any, rowData: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowData(rowData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleMenuItemClick = async () => {
    const userID = rowData ;

    const params = userID;
    navigate("details", { state: params });
    

    handleMenuClose();
  };

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
        onClick={() => handleMenuItemClick()}
      >
        <Typography fontWeight={400} fontSize="14px">
          View Details
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
        onClick={(e) => handleMenuOpen(e, row)}
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

export default RequestTableDropdown;
