import { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useLazyFilterHotelsQuery } from "api/inventoryAPISlice";
import { openCreateHotelDrawer, openHotelDetailsDrawer, selectShouldReloadHotelList, setReload } from "features/inventory-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DataRow from "./data-row";
import { THotel } from "types/hotel";

const DepartmentList = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const shouldReload = useAppSelector(selectShouldReloadHotelList)

  const [triggerFilterHotels, { data }] = useLazyFilterHotelsQuery();

  useEffect(() => {
    if (shouldReload) {
      triggerFilterHotels()
      dispatch(setReload(false))
    }
  }, [shouldReload]);

  useEffect(() => {
    triggerFilterHotels();
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

  const handleViewDetails = (hotel: THotel) => dispatch(openHotelDetailsDrawer(hotel));
  const handleUpdateDetails = (hotel: THotel) => dispatch(openCreateHotelDrawer(hotel));

  return (
    <Box>


      <Box>
        <TableContainer >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Hotel</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => (
                <DataRow key={i} row={row} onViewDetails={handleViewDetails} onUpdateDetails={handleUpdateDetails} />
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

export default DepartmentList;