import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useLazyFilterReservationsQuery } from "api/jobsAPISlice";
import { toggleDetailsDrawer } from "features/jobs-slice";
import { useAppDispatch } from "hooks/hooks";
import { useEffect, useState } from "react";
import DataRow from "./data-row";

import { data } from "./mockdata";

const JobList = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [triggerFilterReservations] = useLazyFilterReservationsQuery();

  useEffect(() => {
    triggerFilterReservations();
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

  const handleViewDetails = () => dispatch(toggleDetailsDrawer());

  return (
    <Box display="flex" flexDirection="column">
      <Box flexGrow={1} overflow="auto">
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Completed By</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Completed At</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <DataRow key={row._id} row={row} onViewDetails={handleViewDetails} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
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

export default JobList;