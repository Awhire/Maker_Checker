import { useState, useEffect } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import RequestTableDropdown from "../../components/RequestTableDropdown";
import { Box } from "@mui/material";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left";
}

const columns: readonly Column[] = [
  { id: "initiated_by_name", label: "Initiator Name" },
  { id: "initiator_comment", label: "Initiator Comment" },
  { id: "request_type", label: "Request Type" },
  { id: "username", label: "Customer Details" },
  { id: "date", label: "Created Date" },
  { id: "status", label: "Status"},
];

type Data = {
  initiated_by_name: string;
  initiator_comment: string;
  approved_by_name: string;
  approval_comment: string;
  status: string;
  id: string;
  request_data: any;
  request_type: string;
  created_at: any
};

function createData(
  initiated_by_name: string,
  initiator_comment: string,
  approved_by_name: string,
  approval_comment: string,
  status: string,
  id: string,
  request_data: any,
  request_type: string,
  created_at: any
): Data {
  return {
    initiated_by_name,
    initiator_comment,
    approved_by_name,
    approval_comment,
    status,
    id,
    request_data,
    request_type,
    created_at
  };
}

const makeStyles = (status: string) => {
  if (status === "approved") {
    return {
      background: "rgba(57, 205, 98, 0.1)",
      color: "#39CD62",
      padding: "4px 15px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  } else if (status === "pending") {
    return {
      background: "rgba(233, 178, 0, 0.1)",
      color: "#E9B200",
      padding: "4px 15px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  }
  if (status === "rejected") {
    return {
      background: "rgba(228, 3, 59, 0.1)",
      color: "#E4033B",
      padding: "4px 15px 4px 25px",
      borderRadius: "10px",
      width: "125px",
    };
  }
};

const ListAdmin = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState("all");
  const [reload, setReload] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await api.getAllRequest();
        const isSuccessful = response.data.isSuccessful;
        console.log(response);
        if (isSuccessful) {
          const data = response.data.data;
          setData(data);
          localStorage.setItem("allRequestData", JSON.stringify(data));
          localStorage.removeItem("status")
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

    const localRequestData = localStorage.getItem("allRequestData");
    if (localRequestData) {
      setData(JSON.parse(localRequestData));
      setIsLoading(false);
    } else getData();
  }, [reload]);


  useEffect(() => {
    const getRequestStatus = async () => {
      if (status !== "all") {
        setIsLoading(true);
        try {
          const response = await api.getAllRequestByStatus(status);
          const data = response.data.data;
          setData(data);
          localStorage.removeItem("status")
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

    getRequestStatus();
  }, [status]);

  const handleClick = (value: any) => {
    if (value === "all") {
      setReload(!reload);
      setStatus(value);
    } else setStatus(value);
  };

  const parsedData = (value: any) =>{
    return JSON.parse(value);
  }

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
  
    

  const rows = data.map((item: any) =>
    createData(
      item.initiated_by_name,
      item.initiator_comment,
      item.approved_by_name,
      item.approval_comment,
      item.status,
      item.id,
      item.request_data,
      item.request_type,
      item.created_at
    )
  );

  return (
    <>
      <Box sx={{ display: "flex", gap: 4, paddingBottom: "35px", overflow: "hidden" }}>
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
          <Typography>View</Typography>
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
          <Typography>Pending Request</Typography>
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
          <Typography>Approved Request</Typography>
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
          <Typography> Rejected Request</Typography>
        </Box>
      </Box>


      <Paper sx={{ width: "100%", overflow: "hidden"}}>
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer sx={{ maxHeight: 540, pl: 0.5 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{minWidth: column.minWidth ,fontWeight: 600}}
                      sx={{whiteSpace: "nowrap"}}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                  align="left"
                  
                ></TableCell>
                </TableRow>

              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography
                            fontWeight={400}
                            sx={{ fontSize: "13px" }}
                          >
                            {row.initiated_by_name}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography
                            fontWeight={400}
                            sx={{ fontSize: "13px" }}
                          >
                            {row.initiator_comment}
                          </Typography>
                        </TableCell>   
                        <TableCell sx={{ p: "12px" }}>
                          <Typography
                            fontWeight={400}
                            sx={{
                              fontSize: "13px",
                              textTransform: "capitalize",
                            }}
                          >
                            {row.request_type}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography
                            fontWeight={400}
                            sx={{
                              fontSize: "13px",
                              textTransform: "capitalize",
                            }}
                          >
                           Name: &nbsp;
                                {
                                    parsedData(row.request_data) && parsedData(row.request_data).first_name
                                    ? parsedData(row.request_data).first_name.replace(/"/g, '')
                                    : "N/A" 
                                }
                                &nbsp;
                                {
                                    parsedData(row.request_data) && parsedData(row.request_data).last_name
                                    ? parsedData(row.request_data).last_name.replace(/"/g, '')
                                    : "N/A" 
                                }
                            
                            <br /> 

                            Email: &nbsp; {
                                    parsedData(row.request_data) && parsedData(row.request_data).email
                                    ? parsedData(row.request_data).email.replace(/"/g, '')
                                    : "N/A" 
                                }
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography
                            fontWeight={400}
                            sx={{
                              fontSize: "13px",
                              textTransform: "capitalize",
                            }}
                          >
                            {formatCreatedAtDate(row.created_at)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography
                            fontWeight={400}
                            sx={{
                              fontSize: "13px",
                              textTransform: "capitalize",
                            }}
                            style={makeStyles(row.status)}
                          >
                            {row.status}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ p: "1px" }}>
                          <RequestTableDropdown
                            rowData={row}
                            reload={reload}
                            setReload={setReload}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ListAdmin;
