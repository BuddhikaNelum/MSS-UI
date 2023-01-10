import { Alert, Box, Drawer, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DrawerHeader from "components/drawer-header";
import { closeCreateDrawer, selectIsDetailsDrawerOpen, toggleDetailsDrawer } from "features/orders-slice";
import { formatDateTime } from "utils/date-util";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderDetails = () => {
  const dispatch = useAppDispatch();

  const { isOpen, order } = useAppSelector(selectIsDetailsDrawerOpen);

  const handleClose = () => dispatch(toggleDetailsDrawer());

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={handleClose}>
      <Box sx={{ width: 500, overflow: "auto", padding: 3 }}>
        <DrawerHeader title={`Order Details`} onClose={handleClose} />

        <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
          <Alert
            variant="filled"
            severity={order?.orderCompleted ? "success" : "info"}
            icon={order?.orderCompleted ? <CheckCircleIcon /> : <HourglassBottomIcon />}
          >
            {order?.orderCompleted ? "Completed" : "Pending"}
          </Alert>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Job ID</Typography>
            <Typography variant="body2">{order?.id}</Typography>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Name</Typography>
            <Typography variant="body2">{order?.job.name}</Typography>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="caption">Order Date</Typography>
            <Typography variant="body2">{formatDateTime(order?.orderdAt || "")}</Typography>
          </Stack>

          {order?.orderCompleted && (
            <Stack sx={{ width: "100%" }}>
              <Typography variant="caption">Completed Date</Typography>
              <Typography variant="body2">{formatDateTime(order!.orderCompletedAt)}</Typography>
            </Stack>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default OrderDetails;
