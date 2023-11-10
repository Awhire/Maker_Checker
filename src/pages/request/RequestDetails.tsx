import { useState, useEffect } from "react";
import api from "../../api/api";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import back from "../../assets/back.svg";



const makeStyles = (status: string) => {
  if (status === "approved") {
    return {
      background: "rgba(57, 205, 98, 0.1)",
      color: "#39CD62",
      padding: "4px 15px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  } 
   else if (status === "rejected") {
    return {
      background: "rgba(228, 3, 59, 0.1)",
      color: "#E4033B",
      padding: "4px 15px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  }
  else {
    return {
      background: "rgba(233, 178, 0, 0.1)",
      color: "#E9B200",
      padding: "4px 15px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  } 
};

function formatCreatedAtDate(dateString: any) {
    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
  
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

const RequestDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const userInfo = JSON.parse(state.request_data);

  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<any>("")
  const [buttonLoading, setButtonLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);


  useEffect(() => {
    const savedStatus = localStorage.getItem("status");
    if (savedStatus) {
      setStatus(savedStatus);
    } else {
      setStatus(state.status);
    }
  }, [state.status]);

  const BackToAllRequest = () => {
    navigate(-1);
  };

  const handleSubmitRequest = async (value: any) => {
    const payload = {
      request_id: state.id,
      approval_comment: comment,
    };

    if (value === "approve") {    
      try {
        setButtonLoading(true);
        const response = await api.approveRequest(payload);
        const isSuccessful = response.data.isSuccessful;
        const data = response.data.data
        console.log(response);
        if (isSuccessful) {
          setStatus(data.status )  
          setComment("")
          localStorage.setItem("status", data.status);
          localStorage.removeItem("allRequestData")   
          toast.success(response.data.responseMessage);
        } else toast.error(response.data.responseMessage);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error("Something went wrong, please try again");
        }
      }

      setButtonLoading(false);
    } else {
        setDeclineLoading(true);
      try {
        const response = await api.declineRequest(payload);
        const isSuccessful = response.data.isSuccessful;
        const data = response.data.data
        console.log(response);
        if (isSuccessful) {
          setStatus( data.status )  
          setComment("")
          localStorage.setItem("status", data.status);
          localStorage.removeItem("allRequestData")  
          toast.success(response.data.responseMessage);
        } else toast.error(response.data.responseMessage);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
      setDeclineLoading(false);
    }
  };

  return (
    <Box sx={{pl: 2}}>

<Box
        component="div"
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          cursor: "pointer",
          mb: 2
        }}
        onClick={BackToAllRequest}
      >
        <img src={back} alt="back-arrow" />
        <Typography fontWeight={400} fontSize={16}>
          Back
        </Typography>
      </Box>

      <Typography variant="h6">Request Details</Typography>

      <Box sx={{ marginTop: "30px", width: "100%" }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1, w: 1 / 4 }}
          >
            Initiator Name :
          </Typography>
          <Typography component="p" sx={{ w: 1 / 4 }}>
            {state.initiated_by_name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            Initiator Comment :
          </Typography>
          <Typography component="p">{state.initiator_comment}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            Type of Request :
          </Typography>
          <Typography component="p" sx={{ textTransform: "capitalize" }}>
            {state.request_type}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            Approved Name :
          </Typography>
          <Typography component="p">{state.approved_by_name ? state.approved_by_name : "N/A"}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            Approval Comment :
          </Typography>
          <Typography component="p">{state.approval_comment ? state.approval_comment : "N/A"}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            Created At :
          </Typography>
          <Typography component="p">{formatCreatedAtDate(state.created_at)}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            Status :
          </Typography>
          <Typography component="p" style={makeStyles(state.status)}>
            {status}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          User Information
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            First Name :
          </Typography>
          <Typography component="p">{userInfo.first_name}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            Last Name :
          </Typography>
          <Typography component="p">{userInfo.last_name}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography
            component="h1"
            sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}
          >
            Email :
          </Typography>
          <Typography component="p">{userInfo.email}</Typography>
        </Box>
      </Box>

      <form style={{ marginTop: "50px" }}>
        <TextField
          id="outlined-multiline-flexible"
          label="Comment"
          multiline
          maxRows={4}
          style={{ width: "400px" }}
          sx={{ marginTop: "20px" }}
          value={comment}
          onChange={(e) => {
            const value = e.target.value;
            setComment(value);
          }}
        />
        <Box sx={{ mt: 1, gap: 5, display: "flex" }}>
          <Button
            type="button"
            variant="outlined"
            color="success"
            fullWidth
            disableElevation
            onClick={() => handleSubmitRequest("approve")}
            //   disabled={!adminRole || buttonLoading}
            sx={{ mt: 3, mb: 2, p: 1.5, width: "180px" }}
          >
            {buttonLoading ? (
              <CircularProgress sx={{ color: "green" }} size={20} />
            ) : (
              <Typography
                color="#39CD62"
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Approve Request
              </Typography>
            )}
          </Button>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            disableElevation
            onClick={() => handleSubmitRequest("rejected")}
            //   disabled={!comment || buttonLoading}
            sx={{ mt: 3, mb: 2, p: 1.5, width: "180px" }}
          >
            {declineLoading ? (
              <CircularProgress sx={{ color: "red" }} size={20} />
            ) : (
              <Typography
                color="text.main"
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Decline Request
              </Typography>
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RequestDetails;
