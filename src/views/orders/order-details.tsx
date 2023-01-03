import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DrawerHeader from "components/drawer-header";
import { closeCreateDrawer, selectOrder, selectIsDetailsDrawerOpen } from "features/orders-slice";

const OrderDetails = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsDetailsDrawerOpen);
  const order = useAppSelector(selectOrder)

  const handleClose = () => dispatch(closeCreateDrawer());

  return (
    <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 500, overflow: 'auto', padding: 3 }}>
        <DrawerHeader title={`Hotel Room Details (${order?.id})`} onClose={handleClose} />

        <Box display='flex' flexDirection='column' gap={2} marginTop={2}>
          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Room ID</Typography>
            <Typography variant='body2'></Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Room No</Typography>
            <Typography variant='body2'></Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Hotel</Typography>
            <Typography variant='body2'></Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Beds</Typography>
            <Typography variant='body2'></Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Occupants</Typography>
            <Typography variant='body2'></Typography>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

export default OrderDetails;