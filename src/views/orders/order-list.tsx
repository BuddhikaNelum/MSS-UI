import { useState } from "react";
import {
  MenuItem,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DataRow from "./data-row";
import { useLazyFilterRoomsByHotelIdQuery } from "api/ordersAPISlice";
import {
  openCreateDrawer,
  toggleDetailsDrawer,
  setReload,
  selectShouldReload,
} from "features/orders-slice";
import { TOrder } from "types/order";

import { data } from "./mockdata";

const OrderList = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const shouldReload = useAppSelector(selectShouldReload);

  const dispatch = useAppDispatch();
  // const [triggerFilterHotelRooms, { data }] =
  //   useLazyFilterRoomsByHotelIdQuery();

  // useEffect(() => {
  //   if (shouldReload) {
  //     triggerFilterHotelRooms(hotelId)
  //     dispatch(setReload(false))
  //   }
  // }, [shouldReload]);

  // useEffect(() => {
  //   triggerFilterHotelRooms(hotelId);
  // }, [hotelId]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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

  const handleViewDetails = (order: TOrder) =>
    dispatch(toggleDetailsDrawer(order));
  const handleUpdateDetails = (order: TOrder) =>
    dispatch(openCreateDrawer(order));

  return (
    <Box>
      <Box>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Job ID</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Completed Date</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <DataRow
                  key={row._id}
                  data={row}
                  onViewDetails={handleViewDetails}
                  onUpdateDetails={handleUpdateDetails}
                />
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

export default OrderList;
