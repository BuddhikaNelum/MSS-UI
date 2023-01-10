import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { selectShouldReload } from "features/inventory-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useLazyGetDepartmentsQuery } from "api/departmentsAPISlice";
import { setReload } from "features/departments-slice";
import DataRow from "./data-row";

const DepartmentList = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const shouldReload = useAppSelector(selectShouldReload);

  const [triggerGetDepartments, { data }] = useLazyGetDepartmentsQuery();

  useEffect(() => {
    if (shouldReload) {
      triggerGetDepartments();
      dispatch(setReload(false));
    }
  }, [shouldReload]);

  useEffect(() => {
    triggerGetDepartments();
  }, []);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Deparment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => (
                <DataRow key={i} row={row} />
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
};

export default DepartmentList;
