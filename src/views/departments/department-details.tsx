import { Alert, Box, Drawer, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { selectIsOpenHotelDetails, openHotelDetailsDrawer, closeHotelDetailsDrawer, selectHotel } from "features/inventory-slice";
import DrawerHeader from "components/drawer-header";
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';

const DepartmentDetails = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsOpenHotelDetails);
  const hotel = useAppSelector(selectHotel)

  const handleClose = () => dispatch(closeHotelDetailsDrawer());

  return (
    <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 500, overflow: 'auto', padding: 3 }}>
        <DrawerHeader title={`Hotel ID: ${(hotel?.id)?.toString().padStart(5, "0")}`} onClose={handleClose} />

        <Box display='flex' flexDirection='column' gap={2} marginTop={2}>
          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Name</Typography>
            <Typography variant='body2'>{hotel?.name}</Typography>
          </Stack>
          
          {/* 
          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Email</Typography>
            <Typography variant='body2'>shashika.j@email.com</Typography>
          </Stack> */}

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Check In</Typography>
            <Typography variant='body2'>{hotel?.checkinFrom}</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Check Out</Typography>
            <Typography variant='body2'>{hotel?.checkoutBefore}</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Contact</Typography>
            <Typography variant='body2'>{hotel?.contact}</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Address</Typography>
            <Typography variant='body2' whiteSpace='pre-wrap'>{hotel?.adress}</Typography>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

export default DepartmentDetails;