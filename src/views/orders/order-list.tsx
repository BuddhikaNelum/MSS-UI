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
  Button
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DataRow from "./data-row";
import { useCreateOrdersReportMutation, useLazyGetOrdersQuery } from "api/ordersAPISlice";
import { openCreateDrawer, toggleDetailsDrawer, setReload, selectShouldReload } from "features/orders-slice";
import { TOrder, TOrdersReportDataRow } from "types/order";
import { setErrorSnackbar } from "features/app-slice";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
      start: "2022-10-10T18:35:00.196Z",
      end: "2023-01-10T18:35:00.196Z",
    })
      .unwrap()
      .then((res) => {
        //TODO: Generate PDF here.
        handlePDFDownloader(res);
      })
      .catch((_err) => {
        dispatch(setErrorSnackbar("Generating orders report failed"));
      });
  };

  async function handlePDFDownloader(res : TOrdersReportDataRow[]) {
    debugger
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
      ["Name", "Status", "Order Date", "Compleated Date"],
    ];
    const maindata = res.map((order) => [
      order.job,
      order.orderCompleted,
      order.orderdAt,
      order.orderCompletedAt,
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

  const handleViewDetails = (order: TOrder) => dispatch(toggleDetailsDrawer(order));
  const handleUpdateDetails = (order: TOrder) => dispatch(openCreateDrawer(order));

  return (
    <Box>
      <Box>
      <Button variant="contained" color="success" onClick={() => handleGenerateReport()}>Download</Button>
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
