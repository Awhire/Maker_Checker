import { useEffect, useState } from "react";
import api from "../../api/api";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const makeStyles = (status: string) => {
  if (status === "approved") {
    return {
      background: "rgba(57, 205, 98, 0.1)",
      color: "#39CD62",
      padding: "4px 25px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  } else if (status === "pending") {
    return {
      background: "rgba(233, 178, 0, 0.1)",
      color: "#E9B200",
      padding: "4px 25px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  }
  if (status === "rejected") {
    return {
      background: "rgba(228, 3, 59, 0.1)",
      color: "#E4033B",
      padding: "4px 25px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  }
};

const AllMapping = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("all");
  const [relaod, setRelaod] = useState(false);

  useEffect(() => {
    const getAllMapping = async () => {
      setIsLoading(true);
      try {
        const response = await api.getAllMapping();
        const data = response.data.data;
        setData(data);
        localStorage.setItem("mappingData", JSON.stringify(data));
        console.log(response);
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
      setIsLoading(false);
    };

    const localMappingData = localStorage.getItem("mappingData");
    if (localMappingData) {
      setData(JSON.parse(localMappingData));
      setIsLoading(false);
    } else getAllMapping();
  }, [relaod]);

  useEffect(() => {
    const getAdminByStatus = async () => {
      if (status !== "all") {
        setIsLoading(true);
        try {
          const response = await api.getAllMappingByStatus(status);
          const data = response.data.data;
          setData(data);
          console.log(response);
        } catch (error: any) {
          console.log(error);
          if (error.response) {
            toast.error(error.response.data.responseMessage);
          } else {
            toast.error("Something went wrong, please try again");
          }
        }
        setIsLoading(false);
      }
    };

    getAdminByStatus();
  }, [status]);

  const handleClick = (value: any) => {
    if (value === "all") {
      setRelaod(!relaod);
      setStatus(value);
    } else setStatus(value);
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

  return (
    <>
      <Box
        sx={{ display: "flex", gap: 4, paddingBottom: "35px" }}
      >
        <Typography>Filter by: </Typography>
        <Box
          sx={{
            "&:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
            color: status === "all" ? "primary.main" : "",
          }}
          onClick={() => handleClick("all")}
          data-testid="pending-button"
        >
          <Typography>All</Typography>
        </Box>

        <Box
          sx={{
            "&:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
            color: status === "pending" ? "primary.main" : "",
          }}
          onClick={() => handleClick("pending")}
          data-testid="pending-button"
        >
          <Typography>Pending</Typography>
        </Box>

        <Box
          sx={{
            "&:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
            color: status === "approved" ? "primary.main" : "",
          }}
          onClick={() => handleClick("approved")}
          data-testid="approved-button"
        >
          <Typography>Approved</Typography>
        </Box>

        <Box
          sx={{
            "&:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
            color: status === "rejected" ? "primary.main" : "",
          }}
          onClick={() => handleClick("rejected")}
          data-testid="reject-button"
        >
          <Typography> Reject</Typography>
        </Box>
      </Box>

     
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "primary.main", fontSize: "16px" }}>
                Supervisor Name
              </TableCell>
            </TableRow>
          </TableHead>

          {isLoading ? (
            <Spinner />
          ) : (
            <TableBody>
              {data.map((admin: any) => (
                <TableRow key={admin.admin_id}>
                  <TableCell>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {admin.admin_name}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Admin Name</TableCell>
                              <TableCell>Initiator Name</TableCell>
                              <TableCell>Created At</TableCell>
                              <TableCell>Approval Name</TableCell>
                              <TableCell>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {admin.admin_mappings.map((mapping: any) => (
                              <TableRow key={mapping.id}>
                                <TableCell>{mapping.mapped_to_name}</TableCell>
                                <TableCell>{mapping.initiated_by_name}</TableCell>
                                <TableCell>{formatCreatedAtDate(mapping.created_at)}</TableCell>
                                <TableCell>{mapping.approved_by_name ? mapping.approved_by_name : "N/A" }</TableCell>
                                <TableCell>
                                  <Typography
                                    fontSize="15px"
                                    sx={{ textTransform: "capitalize" }}
                                    style={makeStyles(mapping.status)}
                                  >
                                    {mapping.status}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default AllMapping;
