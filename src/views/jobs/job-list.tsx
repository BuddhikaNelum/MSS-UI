import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useCreateJobReportMutation, useLazyGetJobsQuery } from "api/jobsAPISlice";
import { setErrorSnackbar } from "features/app-slice";
import { selectShouldReload, setReload, toggleDetailsDrawer } from "features/jobs-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";
import { TJob } from "types/job";
import DataRow from "./data-row";

const JobList = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const shouldReload = useAppSelector(selectShouldReload);

  const [triggerGetJobs, { data }] = useLazyGetJobsQuery();
  const [triggerGetJobReportData] = useCreateJobReportMutation();

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
      start: "",
      end: "",
    })
      .unwrap()
      .then((res) => {
        //TODO: Generate PDF here.
      })
      .catch((_err) => {
        dispatch(setErrorSnackbar("Generating job report failed"));
      });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box flexGrow={1} overflow="auto">
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
