import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useLazyGetInventoryQuery } from "api/inventoryAPISlice";
import { selectShouldReload, setReload, toggleDetailsDrawer } from "features/inventory-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";
import DataRow from "./data-row";

const InventoryList = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const shouldReload = useAppSelector(selectShouldReload);

  const [triggerGetInventory, { data, isLoading }] = useLazyGetInventoryQuery();

  useEffect(() => {
    if (shouldReload) {
      triggerGetInventory();
      dispatch(setReload(false));
    }
  }, [shouldReload]);

  useEffect(() => {
    triggerGetInventory();
  }, []);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = () => dispatch(toggleDetailsDrawer());

  return (
    <Box>
      <Box>
        <TableContainer sx={{ maxHeight: "calc(500px - 200px)" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell />
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
};

export default InventoryList;
