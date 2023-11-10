import { useState, useEffect } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import GetByStatusDropdown from "../../components/GetByStatusDropdown";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface Column {
  id: "name" | "email" | "admin_role" | "added_by_name";
  label: string;
  align?: "left";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name" },
  { id: "email", label: "Mapped To" },
  { id: "admin_role", label: "Initiated By", align: "left" },
  { id: "added_by_name", label: "Status" },
];

type Data = {
  admin_name: string;
  mapped_to_name: string;
  initiated_by_name: string;
  status: string;
  id: string;
};

function createData(
  admin_name: string,
  mapped_to_name: string,
  initiated_by_name: string,
  status: string,
  id: string
): Data {
  return { admin_name, initiated_by_name, mapped_to_name, status, id };
}

const makeStyles = (status: string) => {
  if (status === "approved") {
    return {
      background: "rgba(57, 205, 98, 0.1)",
      color: "#39CD62",
      padding: "4px 25px 4px 18px",
      borderRadius: "10px",
      width: "100px",
    };
  } else if (status === "pending") {
    return {
      background: "rgba(233, 178, 0, 0.1)",
      color: "#E9B200",
      padding: "4px 25px 4px 23px",
      borderRadius: "10px",
      width: "100px",
    };
  }
  if (status === "rejected") {
    return {
      background: "rgba(228, 3, 59, 0.1)",
      color: "#E4033B",
      padding: "4px 25px 4px 20px",
      borderRadius: "10px",
      width: "100px",
    };
  }
};

const ViewMapping = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState("pending");

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
        const response = await api.getMappingByIdStatus(status);
        const isSuccessful = response.data.isSuccessful;
        if (isSuccessful) {
          const data = response.data.data;
          setData(data);
          localStorage.removeItem("mappingData");
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

    getData();
  }, [status, reload]);

  const handleClick = (value: any) => {
    setStatus(value);
  };

  const rows = data.map((item: any) =>
    createData(
      item.admin_name,
      item.mapped_to_name,
      item.initiated_by_name,
      item.status,
      item.id
    )
  );

  return (
    <>
      <Box sx={{ display: "flex", gap: 4, pb: 4, pl: 2 }}>
        <Typography>Filter by: </Typography>

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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                    >
                      {column.label}
                    </TableCell>
                  ))}
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
                            {row.admin_name}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography
                            fontWeight={400}
                            sx={{ fontSize: "13px" }}
                          >
                            {row.mapped_to_name}
                          </Typography>
                        </TableCell>
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
                            sx={{
                              fontSize: "13px",
                              textTransform: "capitalize",
                            }}
                            style={makeStyles(row.status)}
                          >
                            {row.status}
                          </Typography>
                        </TableCell>

                        {status === "pending" && (
                          <TableCell sx={{ p: "1px" }}>
                            <GetByStatusDropdown
                              rowData={row}
                              reload={reload}
                              setReload={setReload}
                            />
                          </TableCell>
                        )}
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

export default ViewMapping;
