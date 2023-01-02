import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useLazyFilterReservationsQuery } from "api/jobsAPISlice";
import { selectShouldReloadRoomList, setReload, toggleReservationDetails } from "features/orders-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";
import DataRow from "./data-row";

const InventoryList = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const shouldReload = useAppSelector(selectShouldReloadRoomList)

  const [triggerFilterReservations, { data, isLoading }] = useLazyFilterReservationsQuery();

  useEffect(() => {
    if (shouldReload) {
      triggerFilterReservations();
      dispatch(setReload(false))
    }
  }, [shouldReload]);

  useEffect(() => {
    triggerFilterReservations();
  }, []);


  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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

  const handleViewDetails = () => dispatch(toggleReservationDetails());

  return (
    <Box>
      <Box>
        <TableContainer sx={{ maxHeight:"calc(500px - 200px)" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ref. ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Room No.</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => (
                <DataRow key={i} row={row} onViewDetails={handleViewDetails} />
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

export default InventoryList;