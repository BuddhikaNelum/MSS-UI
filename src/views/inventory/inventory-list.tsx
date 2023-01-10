import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from "@mui/material";
// import { useLazyFilterReservationsQuery } from "api/jobsAPISlice";
import { selectShouldReload, setReload, toggleDetailsDrawer } from "features/inventory-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";
import DataRow from "./data-row";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useLazyGetInventoryQuery } from "api/inventoryAPISlice";

const InventoryList = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data1, setData1] = useState([
    {
      part_title : "test",
      part_count : "test",
      part_sold : "test",
      status : 1,
    }, 
    {
      part_title : "test1",
      part_count : "test1",
      part_sold : "test1",
      status : 1,
    }, 
  ])

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

  async function handlePDFDownloader() {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Report";

    // const startdate = moment(startDate).format("DD-MM-YYYY ");
    // const newdat = "Start Date : " + startdate;
    // const enddate = "End Date  : " + moment(endDate).format("DD-MM-YYYY ");

    const headers = [
      ["Name", "Part-Count", "Sold-Count", "Order Status"],
    ];
    const maindata = data1.map((order) => [
      order.part_title,
      order.part_count,
      order.part_sold,
      order.status,
    ]);

    let content = {
      startY: 90,
      head: headers,
      body: maindata,
      headStyles: { fillColor: "#205178" },
    };

    doc.setFontSize(20);
    (doc as any).text(40, 40, title).setFont(undefined, "bold");

    // doc.setFontSize(12);
    // doc.text(40, 60, newdat);
    // doc.setFontSize(12);
    // doc.text(40, 80, enddate);

    (doc as any).autoTable(content);
    doc.save("report.pdf");
  }

  return (
    <Box>
      <Box>
        <Button variant="contained" color="success" onClick={handlePDFDownloader}>Download</Button>
        <TableContainer sx={{ maxHeight:"calc(500px - 200px)" }}>
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
