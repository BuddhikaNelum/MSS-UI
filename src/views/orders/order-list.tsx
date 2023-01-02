import { useEffect, useState } from "react";
import { MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DataRow from "./data-row";
import { useLazyFilterRoomsByHotelIdQuery } from "api/ordersAPISlice";
import { THotelRoom } from "types/hotelRoom";
import { openCreateRoomDrawer, openRoomDetailsDrawer, selectHotels, selectShouldReloadRoomList, setReload } from "features/departments-slice";

const OrderList = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hotelId, setHotelId] = useState(1);

  const shouldReload = useAppSelector(selectShouldReloadRoomList)
  const hotels = useAppSelector(selectHotels)

  const dispatch = useAppDispatch();
  const [triggerFilterHotelRooms, { data }] = useLazyFilterRoomsByHotelIdQuery();

  useEffect(() => {
    if (shouldReload) {
      triggerFilterHotelRooms(hotelId)
      dispatch(setReload(false))
    }
  }, [shouldReload]);

  useEffect(() => {
    triggerFilterHotelRooms(hotelId);
  }, [hotelId]);

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

  const handleViewDetails = (room: THotelRoom) => dispatch(openRoomDetailsDrawer(room));
  const handleUpdateDetails = (room: THotelRoom) => dispatch(openCreateRoomDrawer(room));

  return (
    <Box>
      <Box sx={{ padding: 1 }}>
        <TextField
          name="hotel"
          variant="outlined"
          fullWidth
          sx={{ margin: '0' }}
          id="hotel"
          label="Hotel"
          value={hotelId}
          onChange={(e) => setHotelId(parseInt(e.target.value))}
          select
        >
          {hotels.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box>
        <TableContainer >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Room No.</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Beds</TableCell>
                <TableCell align="right">Occupants</TableCell>
                <TableCell align="right">Price (Rs)</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <DataRow key={row.id} data={row} onViewDetails={handleViewDetails} onUpdateDetails={handleUpdateDetails} />
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

export default OrderList;