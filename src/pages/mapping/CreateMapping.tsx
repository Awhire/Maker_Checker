import { useState, useEffect } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Autocomplete,
} from "@mui/material";

const CreateMapping = () => {
  const [initiatorinfo, setInitiatorinfo] = useState<any>(null);
  const [approvalInfo, setApprovalInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await api.getAdminData();
        const isSuccessful = response.data.isSuccessful;
        if (isSuccessful) {
          const data = response.data.data;
          setData(data);
          localStorage.setItem("tableData", JSON.stringify(data));
        } else toast.error(response.data.responseMessage);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
      setIsLoading(false);
    };

    const localTableData = localStorage.getItem("tableData");
    if (localTableData) {
      setData(JSON.parse(localTableData));
      setIsLoading(false);
      console.log(JSON.parse(localTableData));
    } else getData();
  }, []);

  const handleSubmit = async () => {
    
    const payload = {
      admin_id: approvalInfo.id,
      mapped_to: initiatorinfo.id,
    };

    console.log(initiatorinfo)
    console.log(approvalInfo)

    setButtonLoading(true);
    try {
      const response = await api.createMapping(payload);
      console.log(response);
      const isSuccessful = response.data.isSuccessful;
      if (isSuccessful) {
        setInitiatorinfo(null)
        setApprovalInfo(null)
        toast.success(response.data.responseMessage);
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
    setButtonLoading(false);
  };

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: "600" }}
          >
            Create Mapping
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "14px", mt: 1 }}>
            Create Mapping and approve mapping
          </Typography>
          <form
            style={{ marginTop: "20px", width: "400px" }}
          >
            <p style={{ fontSize: "14px" }}>Name Of Initiator</p>
            <Autocomplete
              options={data}
              getOptionLabel={(option: any) => option.name}
              value={initiatorinfo}
              onChange={(e, newValue) => {
                setInitiatorinfo(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Initiator Name" />
              )}
            />

            <p style={{ fontSize: "14px" }}>Name Of Approval</p>

            <Autocomplete
              options={data}
              getOptionLabel={(option: any) => option.name}
              value={approvalInfo}
              onChange={(e, newValue) => {
                setApprovalInfo(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Approval Name" />
              )}
            />

            <Button
              type="button"
              variant="contained"
              fullWidth
              disableElevation
              onClick={handleSubmit}
              disabled={(!initiatorinfo || !approvalInfo) && buttonLoading}
              sx={{ mt: 3, mb: 2, p: 1.5 }}
              data-testid="submit-button"
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
                  Create
                </Typography>
              )}
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};

export default CreateMapping;
