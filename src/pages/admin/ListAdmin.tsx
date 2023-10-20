import { useState } from 'react';
import { format } from "date-fns";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



const formatDate = (date: any) => {
    return format(new Date(date), "MMM dd, yyyy HH:mm aa");
};

interface Column {
  id: 'name' | 'email' | 'admin_role' | "created_at" | "updated_at";
  label: string;
  minWidth?: number;
  align?: 'left';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'admin_role', label: 'Admin Role', minWidth: 170, align: 'left'},
  { id: 'created_at', label: 'Created', minWidth: 170 },
  { id: 'updated_at', label: 'Updated', minWidth: 170 },
];

interface Data {
  name: string;
  email: string;
  admin_role: string;
  created_at: string;
  updated_at: string;
}

function createData(
  name: string,
  email: string,
  admin_role: string,
  created_at: string,
  updated_at: string
): Data {
  return { name, email, admin_role, created_at, updated_at };
}

const rows = [
  createData('Tery Anpwepo', 'Tery@gmail.com', "Support", "2023-05-23", "2023-05-23"),
  createData('Brown Golipoloa', 'brown@gmail.com', "Super Admin", "2023-05-23", "2023-05-23"),
  createData('Theophillous Aliansina', 'theophillous@gmail.com', "Supervisor", "2023-05-23", "2023-05-23"),
  createData('Lekaan Kashamadupe', 'lekaan@gmail.com', "Support", "2023-05-23", "2023-05-23"),
  createData('Susan Swift', 'susan@gmail.com', "Super Admin", "2023-05-23", "2023-05-23"),
  createData('Juliet Loisey', 'Juliet@gmail.com', "Supervisor", "2023-05-23", "2023-05-23"),
  createData('Tunde Bakare', 'tunde@gmail.com', "Support", "2023-05-23", "2023-05-23"),
  createData('Ashley Cukaorilina', 'ashley@gmail.com', "Super Admin", "2023-05-23", "2023-05-23"),
  createData('Adeyinka Luis', 'adeyinka@gmail.com', "Supervisor", "2023-05-23", "2023-05-23"),
  createData('Caroline Newyoork', 'caroline@gmail.com', "Super Admin", "2023-05-23", "2023-05-23"),
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          { value }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
}
