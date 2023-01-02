import { useEffect, useState } from 'react';
import { Box, Typography, Backdrop, Fade, Modal, colors, useTheme } from '@mui/material';
import ReservationForm from './reservation-form';
import { useLazyGetHotelByIdQuery } from 'api/inventoryAPISlice';
import { THotel } from 'types/hotel';
import { useLazyFilterRoomsByHotelIdQuery } from 'api/ordersAPISlice';
import { THotelRoom, THotelRoomOption } from 'types/hotelRoom';
import { RoomType } from 'enums/roomType';

interface IProps {
  open: boolean;
  stayInfo: any;
  onClose: () => void;
}

const style = {
  popLayout: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    boxShadow: 24,
    bgcolor: colors.common.white,
    p: 4,
    overflowY: 'auto',
    maxHeight: '80%'
  },
  label: {
    width: '30%'
  },
  desc: {
    width: '70%'
  },
};

const CreateReservation = ({ open, onClose, stayInfo }: IProps) => {
  const mdTheme = useTheme();

  const [hotel, setHotel] = useState<THotel | undefined>(undefined);

  const [triggerGetHotelById] = useLazyGetHotelByIdQuery();

  useEffect(() => {
    if (stayInfo) {
      handleGetHotelDetails()
    }
  }, [stayInfo]);

  const handleGetHotelDetails = async () => {
    const { isSuccess, data } = await triggerGetHotelById(stayInfo.hotelId);

    if (isSuccess) {
      setHotel(data);
    } else {
      onClose()
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style.popLayout}>
          <Typography id="transition-modal-title" variant="h5" component="h2" marginBottom={3}>
            Finalize Your Stay
          </Typography>

          {/* general information */}
          <Box display='flex' flexWrap='wrap' borderRadius={2} sx={{ padding: 2.5, backgroundColor: mdTheme.palette.grey[200] }}>
            <Typography sx={style.label} variant='caption'>Hotel</Typography>
            <Typography sx={style.desc}>{hotel?.name}</Typography>

            <Typography sx={style.label} variant='caption'>Address</Typography>
            <Typography sx={style.desc}>{hotel?.adress}</Typography>

            <Typography sx={style.label} variant='caption'>Reception is open</Typography>
            <Typography sx={style.desc}>24 hours</Typography>

            <Typography sx={style.label} variant='caption'>Check-in from</Typography>
            <Typography sx={style.desc}>{hotel?.checkinFrom}</Typography>

            <Typography sx={style.label} variant='caption'>Check-out before</Typography>
            <Typography sx={style.desc}>{hotel?.checkoutBefore}</Typography>

            <Typography sx={style.label} variant='caption'>Spoken languages</Typography>
            <Typography sx={style.desc}>English</Typography>

            <Typography sx={style.label} variant='caption'>Contact</Typography>
            <Typography sx={style.desc}>{hotel?.contact}</Typography>
          </Box>

          {/* booking information */}
          <ReservationForm stayInfo={stayInfo} onClose={onClose} />

        </Box>
      </Fade>
    </Modal>
  );

}

export default CreateReservation;