import { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useLazyFilterEmployeesQuery } from "api/employeeAPISlice";
import { openCreateEmployee, openEmployeeDetailsDrawer, selectShouldReloadEmployeeList, setReload } from "features/employees-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { TEmployee } from "types/employee";
import DataRow from "./data-row";

const HotelList = () => {
  const dispatch = useAppDispatch();
  const shouldReload = useAppSelector(selectShouldReloadEmployeeList)

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [triggerFilterEmployees, { data }] = useLazyFilterEmployeesQuery();

  useEffect(() => {
    if (shouldReload) {
      triggerFilterEmployees()
      dispatch(setReload(false))
    }
  }, [shouldReload]);

  useEffect(() => {
    triggerFilterEmployees();
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (employee: TEmployee) => dispatch(openEmployeeDetailsDrawer(employee));
  const handleUpdateDetails = (employee: TEmployee) => dispatch(openCreateEmployee(employee));

  return (
    <Box>
      <Box>
        <TableContainer >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Emp. Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <DataRow key={row.id} row={row} onViewDetails={handleViewDetails} onUpdateDetails={handleUpdateDetails} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      
    </Box>
  );
}

export default HotelList;