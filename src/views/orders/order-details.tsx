import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import DrawerHeader from "components/drawer-header";
import { closeRoomDetailsDrawer, selectHotelRoom, selectIsOpenRoomDetails } from "features/departments-slice";
import { roomTypeOptions } from "./metadata";
import { RoomType } from "enums/roomType";

const OrderDetails = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsOpenRoomDetails);
  const room = useAppSelector(selectHotelRoom)

  const handleClose = () => dispatch(closeRoomDetailsDrawer());

  return (
    <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 500, overflow: 'auto', padding: 3 }}>
        <DrawerHeader title={`Hotel Room Details (${room?.id})`} onClose={handleClose} />

        <Box display='flex' flexDirection='column' gap={2} marginTop={2}>
          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Room ID</Typography>
            <Typography variant='body2'>{room?.id}</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Type</Typography>
            <Typography variant='body2'>{room?.roomType ? roomTypeOptions[RoomType[room.roomType]] : ''}</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Room No</Typography>
            <Typography variant='body2'>{room?.roomNumber}</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Hotel</Typography>
            <Typography variant='body2'>{room?.hotelId}</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Beds</Typography>
            <Typography variant='body2'>{room?.beds}</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Occupants</Typography>
            <Typography variant='body2'>{room?.occupants}</Typography>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

export default OrderDetails;