import { useState, useEffect } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import AdminTableDropdown from "../../components/AdminTableDropdown";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography"


interface Column {
  id: "name" | "email" | "admin_role" | "added_by_name" | "created_at";
  label: string;
  minWidth?: number;
  align?: "left";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "admin_role", label: "Admin Role", minWidth: 170, align: "left" },
  { id: "added_by_name", label: "Add By", minWidth: 170 },
  { id: "created_at", label: "Created At", minWidth: 170 },
];

type Data = {
  name: string;
  email: string;
  admin_role: string;
  added_by_name: string;
  created_at: string;
  id: string;
}

function createData(
  name: string,
  email: string,
  admin_role: string,
  added_by_name: string,
  created_at: string,
  id: string,
): Data {
  return { name, email, admin_role, added_by_name, created_at, id };
}


const ListAdmin = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reload, setReload] = useState(false)

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
        const response = await api.getAdminData();
        const isSuccessful = response.data.isSuccessful
        if (isSuccessful) {
          const data = response.data.data;
          setData(data);
          localStorage.setItem("tableData", JSON.stringify(data));
        } else toast.error(response.data.responseMessage);
    } catch (error: any) {
        console.log(error)
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
        setData(JSON.parse(localTableData))
        setIsLoading(false)
    } else getData()
  }, [reload]);

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
      item.name,
      item.email,
      item.admin_role,
      item.added_by_name,
      item.created_at,
      item.id,
    )
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {isLoading ? ( <Spinner /> ) : (
        <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                      <Typography fontWeight={400} sx={{ fontSize: "13px" }}>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: "12px" }}>
                      <Typography fontWeight={400} sx={{ fontSize: "13px" }}>
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: "12px" }}>
                      <Typography fontWeight={400} sx={{ fontSize: "13px" }}>
                        {row.admin_role}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: "12px" }}>
                      <Typography fontWeight={400} sx={{ fontSize: "13px" }}>
                        {row.added_by_name ? row.added_by_name : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: "12px" }}>
                      <Typography fontWeight={400} sx={{ fontSize: "13px" }}>
                        {formatCreatedAtDate(row.created_at)}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ p: "1px" }}>
                      <AdminTableDropdown rowData={row} reload={reload} setReload={setReload} />
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
  );
};

export default ListAdmin;
