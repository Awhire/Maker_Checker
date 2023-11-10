import { useState } from "react";
import api from "../api/api";
import {
  Typography,
  IconButton,
  Popover,
  Box,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";


const GetByStatusDropdown = ({ rowData, reload, setReload }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);


  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleClick = async (value: string) => {
    const id = rowData.id
    const payload = {
      map_id: id,
      status: value,
    };

    console.log(payload)
    if (value === "approved") {
        if (!approveLoading){

            try {
                setApproveLoading(true);
                const response = await api.approveAdminMapping(payload);
                console.log(response)
                const isSuccessful = response.data.isSuccessful;
                if (isSuccessful) {
                    setReload(!reload);
                    toast.success(response.data.responseMessage);   
                } else {
                    toast.error(response.data.responseMessage);
                }
            } catch (error: any) {
                if (error.response) {
                    toast.error(error.response.data.responseMessage);
                } else {
                    toast.error("Something went wrong, please try again");
                }
            }
        }
    } else {
        if(!rejectLoading) {

            try {
                setRejectLoading(true);
                const response = await api.approveAdminMapping(payload);
                console.log(response)
                const isSuccessful = response.data.isSuccessful;
                if (isSuccessful) {
                    setReload(!reload);
                    toast.success(response.data.responseMessage);   
                } else {
                    toast.error(response.data.responseMessage);
                }
            } catch (error: any) {
                if (error.response) {
                    toast.error(error.response.data.responseMessage);
                } else {
                    toast.error("Something went wrong, please try again");
                }
            }
        }
    }
    
        setApproveLoading(false);
        setRejectLoading(false);


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
        onClick={() => handleClick("approved")}
      >
        <Typography fontWeight={400} fontSize="14px">
            {approveLoading && <CircularProgress size={12} />} 
            <span style={{paddingLeft: "4px"}}>Approve</span> 
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
        onClick={() => handleClick("rejected")}

      >
        <Typography fontWeight={400} fontSize="14px">
            {rejectLoading && <CircularProgress size={12} />} 
           <span style={{paddingLeft: "4px"}}>Reject</span> 
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

export default GetByStatusDropdown;
