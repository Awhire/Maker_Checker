import { useState } from "react";
import api from "../api/api";
import {
  Typography,
  IconButton,
  Popover,
  Box,
  Backdrop,
  Modal,
  Fade,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

const AdminTableDropdown = ({ rowData, reload, setReload }: any) => {
  const row = rowData;

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  const [openModal, setOpenModal] = useState(false);
  const [adminRole, setAdminRole] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  // Modal Open & Close
  const handleOpenModal = () => {
    setOpenModal(true);
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleMenuOpen = (event: any, rowData: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowData(rowData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleMenuItemClick = async (value: string) => {
    const userID = selectedRowData.id ;
    const payload = {
      admin_role: adminRole,
      admin_id: userID,
    };

    if (value === "updateRole") {
      try {
        setButtonLoading(true);
        const response = await api.updateAdminRole(payload);
        const isSuccessful = response.data.isSuccessful;
        if (isSuccessful) {
          localStorage.removeItem("tableData")
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
      setButtonLoading(false);
    } 
    else {
      const params = selectedRowData.id;
      navigate("details", { state: params });
    }

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
        onClick={handleOpenModal}
      >
        <Typography fontWeight={400} fontSize="14px">
          Update Role
        </Typography>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography fontWeight={600} fontSize="14px">
              Update Role
            </Typography>
            <form>
              <FormControl
                sx={{ mt: 1.5, width: "300px" }}
                fullWidth
                size="small"
              >
                <InputLabel id="demo-select-small-label" sx={{ fontSize: 14 }}>
                  Role
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  name="admin_role"
                  id="admin_role"
                  label="Role"
                  value={adminRole}
                  onChange={(event) => {
                    setAdminRole(event.target.value);
                  }}
                  sx={{ fontSize: 16 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="support">Support</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                  <MenuItem value="superadmin">Super Admin</MenuItem>
                </Select>
              </FormControl>
              <br />
              <Button
                type="button"
                variant="contained"
                fullWidth
                disableElevation
                onClick={() => handleMenuItemClick("updateRole")}
                disabled={!adminRole || buttonLoading}
                sx={{ mt: 3, mb: 2, p: 1.5, width: "300px" }}
              >
                {buttonLoading ? (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                ) : (
                  <Typography
                    color="text.white"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Update Role
                  </Typography>
                )}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
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

export default AdminTableDropdown;
