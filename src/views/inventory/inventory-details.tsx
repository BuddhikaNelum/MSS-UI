import { Alert, Box, Drawer, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { selectIsDetailsDrawerOpen, toggleDetailsDrawer } from "features/inventory-slice";
import DrawerHeader from "components/drawer-header";
import RoomCard from 'components/room-card';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';

const InventoryDetails = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsDetailsDrawerOpen);

  const handleClose = () => dispatch(toggleDetailsDrawer());

  return (
    <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 500, overflow: 'auto', padding: 3 }}>
        <DrawerHeader title={"Reference ID: 11223344"} onClose={handleClose} />

        <Box display='flex' flexDirection='column' gap={2} marginTop={2}>
          <Alert variant="filled" severity="success" icon={<PaidTwoToneIcon />}>
            Paid
          </Alert>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Guest</Typography>
            <Typography variant='body2'>Mr.Shashika Jayawardhana</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Email</Typography>
            <Typography variant='body2'>shashika.j@email.com</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Phone</Typography>
            <Typography variant='body2'>0770111222</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Check In</Typography>
            <Typography variant='body2'>25/08/2022</Typography>
          </Stack>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='caption'>Check Out</Typography>
            <Typography variant='body2'>01/09/2022</Typography>
          </Stack>

          <RoomCard isSelected={false} />

        </Box>
      </Box>
    </Drawer>
  );
}

export default InventoryDetails;