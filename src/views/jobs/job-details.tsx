import {
  Box,
  Button,
  Drawer,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DrawerHeader from "components/drawer-header";
import { selectIsDetailsDrawerOpen, setReload, toggleDetailsDrawer } from "features/jobs-slice";
import { useRequestFromInventoryMutation } from "api/ordersAPISlice";
import { setErrorSnackbar, setSuccessSnackbar } from "features/app-slice";
import moment from "moment";

const JobDetails = () => {
  const dispatch = useAppDispatch();

  const { isOpen, job } = useAppSelector(selectIsDetailsDrawerOpen);

  const [triggerAcceptJob] = useRequestFromInventoryMutation();

  const handleClose = () => dispatch(toggleDetailsDrawer());

  const handleAcceptJob = async () => {
    triggerAcceptJob({
      orderdAt: moment().format(),
      jobId: job!.id,
    })
      .unwrap()
      .then((_res) => {
        dispatch(setSuccessSnackbar("Job accepted successfully"));
        dispatch(setReload(true));
        handleClose();
      })
      .catch((_err) => {
        dispatch(setErrorSnackbar("Operation failed"));
      });
  };

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={handleClose}>
      <Box sx={{ width: 500, overflow: "auto", padding: 3 }}>
        <DrawerHeader title={"Job Details"} onClose={handleClose} />

        <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
          {/* <Alert variant="filled" severity="success" icon={<PaidTwoToneIcon />}>
            Paid
          </Alert> */}

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Job Id</Typography>
            <Typography variant="body2">{`${job?.id}`.padStart(10, "0")}</Typography>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Job Name</Typography>
            <Typography variant="body2">{job?.name}</Typography>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Department</Typography>
            <Typography variant="body2">{job?.department.name}</Typography>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Description</Typography>
            <Typography variant="body2">{job?.description}</Typography>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Created By</Typography>
            <Typography variant="body2">{job?.applicationUser.email}</Typography>
          </Stack>

          <Box maxHeight={200}>
            <TableContainer>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Qty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {job?.workMaterials.map((row) => (
                    <TableRow key={row.inventory.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell>{row.inventory.name}</TableCell>
                      <TableCell align="right">{row.inventory.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Created At</Typography>
            <Typography variant="body2">{job?.createdAt}</Typography>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Completed At</Typography>
            <Typography variant="body2">{job?.completedAt}</Typography>
          </Stack>

          <Button fullWidth variant="contained" color="primary" sx={{ margin: "normal" }} onClick={handleAcceptJob}>
            Accept
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default JobDetails;
