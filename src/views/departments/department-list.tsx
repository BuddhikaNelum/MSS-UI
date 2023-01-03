import { useState } from "react";
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
import { selectShouldReloadHotelList } from "features/inventory-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DataRow from "./data-row";

import { data } from "./mockdata";

const DepartmentList = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const shouldReload = useAppSelector(selectShouldReloadHotelList);

  // const [triggerFilterHotels, { data }] = useLazyFilterHotelsQuery();

  // useEffect(() => {
  //   if (shouldReload) {
  //     triggerFilterHotels();
  //     dispatch(setReload(false));
  //   }
  // }, [shouldReload]);

  // useEffect(() => {
  //   triggerFilterHotels();
  // }, []);

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
