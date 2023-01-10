import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from "@mui/material";
import { useCreateJobReportMutation, useLazyGetJobsQuery } from "api/jobsAPISlice";
import { setErrorSnackbar } from "features/app-slice";
import { selectShouldReload, setReload, toggleDetailsDrawer } from "features/jobs-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";
import { TJob, TJobRowReport } from "types/job";
import DataRow from "./data-row";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useLazyGetInventoryQuery } from "api/inventoryAPISlice";
import DatePicker from "react-datepicker";
import moment from "moment";

const JobList = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const shouldReload = useAppSelector(selectShouldReload);

  const [triggerGetJobs, { data }] = useLazyGetJobsQuery();
  const [triggerGetJobReportData] = useCreateJobReportMutation();

  const [startDate, setStartDate] = useState(moment().format());
  const [endDate, setEndDate] = useState(moment().format());

  const [data1, setData1] = useState<any>()

  useEffect(() => {
    if (shouldReload) {
      triggerGetJobs();
      dispatch(setReload(false));
    }
  }, [shouldReload]);

  useEffect(() => {
    triggerGetJobs();
  }, []);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (job: TJob) => dispatch(toggleDetailsDrawer(job));

  const handleGenerateReport = async () => {
    //TODO: Change dates.
    triggerGetJobReportData({
      start: "2022-10-10T18:35:00.196Z",
      end: "2023-01-10T18:35:00.196Z",
    })
      .unwrap()
      .then((res) => {
        //TODO: Generate PDF here.
        console.log("res", res);
        setData1(res)
        handlePDFDownloader(res);
      })
      .catch((_err) => {
        dispatch(setErrorSnackbar("Generating job report failed"));
      });
  };

  async function handlePDFDownloader(res : TJobRowReport[]) {
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
      ["Name", "Department", "Status", "createdAt"],
    ];
    const maindata = res.map((order) => [
      order.name,
      order.department,
      order.jobStatus,
      order.createdAt,
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
    <Box display="flex" flexDirection="column">
      <Box flexGrow={1} overflow="auto">
      {/* <div className="filter-fields col-lg-2 col-md-6">
            <div className="d-flex align-items-center">
              From
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="form-control date-picker  ms-2"
                placeholderText="dd/mm/yyyy"
              />
            </div>
          </div>
          <div className="filter-fields col-lg-2 col-md-6">
            <div className="d-flex align-items-center ">
              To
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="form-control date-picker  ms-2"
                placeholderText="dd/mm/yyyy"
              />
            </div>
          </div> */}
      <Button variant="contained" color="success" onClick={() => handleGenerateReport()}>Download</Button>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Completed At</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {(data || []).map((row) => (
                <DataRow key={row.id} row={row} onViewDetails={handleViewDetails} />
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
};

export default JobList;
