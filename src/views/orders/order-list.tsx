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
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DataRow from "./data-row";
import { useCreateOrdersReportMutation, useLazyGetOrdersQuery } from "api/ordersAPISlice";
import { openCreateDrawer, toggleDetailsDrawer, setReload, selectShouldReload } from "features/orders-slice";
import { TOrder } from "types/order";
import { setErrorSnackbar } from "features/app-slice";

const OrderList = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const shouldReload = useAppSelector(selectShouldReload);

  const [triggerGetOrders, { data }] = useLazyGetOrdersQuery();
  const [triggerGetOrdersReportData] = useCreateOrdersReportMutation();

  useEffect(() => {
    if (shouldReload) {
      triggerGetOrders();
      dispatch(setReload(false));
    }
  }, [shouldReload]);

  useEffect(() => {
    triggerGetOrders();
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGenerateReport = async () => {
    //TODO: Change dates.
    triggerGetOrdersReportData({
      start: "",
      end: "",
    })
      .unwrap()
      .then((res) => {
        //TODO: Generate PDF here.
      })
      .catch((_err) => {
        dispatch(setErrorSnackbar("Generating orders report failed"));
      });
  };

  const handleViewDetails = (order: TOrder) => dispatch(toggleDetailsDrawer(order));
  const handleUpdateDetails = (order: TOrder) => dispatch(openCreateDrawer(order));

  return (
    <Box>
      <Box>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Job ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Completed Date</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <DataRow
                  key={row.id}
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
