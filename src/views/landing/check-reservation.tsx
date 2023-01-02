import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, TextField, MenuItem } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { makeStyles } from '@mui/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCheckBookingMutation } from 'api/jobsAPISlice';
import { useLazyFilterHotelsQuery } from 'api/inventoryAPISlice';
import { TBookingCheck, TStayInfo } from "types/reservation";
import { useAppDispatch } from 'hooks/hooks';
import { setErrorSnackbar } from 'features/app-slice';
import { useLazyFilterRoomsByHotelIdQuery } from 'api/ordersAPISlice';
import { THotelRoomOption } from 'types/hotelRoom';
import { RoomType } from 'enums/roomType';

const useStyles = makeStyles({
  bookingLayout: {
    backgroundColor: '#ffedd5',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '0',
    right: '0',
    padding: '2rem',
    width: 'fit-content',
    borderRadius: '0.3rem',
    gap: '0.3rem',
    display: 'flex',
    alignItems: 'center'
  }
})

interface IProps {
  onInitiateReservation: (stayInfo: any) => void
}

const CheckReservation = ({ onInitiateReservation }: IProps) => {
  const dispatch = useAppDispatch();
  const today = moment();
  const classes = useStyles();

  const [hotels, setHotels] = useState<Array<{ id: number, label: string }>>([]);
  const [hotelId, setHotelId] = useState<number | undefined>(undefined);
  const [rooms, setRooms] = useState<Array<THotelRoomOption>>([]);

  const [triggerCheckBooking] = useCheckBookingMutation();
  const [triggerFilterHotels, { isLoading }] = useLazyFilterHotelsQuery();
  const [triggerGetRoomsByHotelId] = useLazyFilterRoomsByHotelIdQuery();

  useEffect(() => {
    (async () => {
      const { data } = await triggerFilterHotels();
      const morphedHotels = data?.map(h => ({ id: h.id, label: h.name }))
      setHotels(morphedHotels ?? [])
    })()
  }, []);

  useEffect(() => {
    if (hotelId) {
      handleGetHotelRooms(hotelId)
    }
  }, [hotelId]);

  const handleGetHotelRooms = async (hotelId: number) => {
    const { isSuccess, data } = await triggerGetRoomsByHotelId(hotelId);

    if (isSuccess) {
      const roomOptions: { [k: number]: THotelRoomOption } = {}

      data.forEach(room => {
        if (roomOptions[room.roomType]) {
          roomOptions[room.roomType].availableRooms.push({ id: room.id!, price: room.price! })
        } else {
          roomOptions[room.roomType] = {
            roomType: room.roomType,
            roomTypeName: RoomType[room.roomType],
            name: room.name,
            availableRooms: [{ id: room.id!, price: room.price! }]

          }
        }
      })

      const morphedRoomOptions = Object.keys(roomOptions).map(key => roomOptions[key]);
      setRooms(morphedRoomOptions);
    }
  }

  const handleCheckBooking = async (values) => {
    const roomOption = rooms.find(r => r.roomType === values.roomType)
    const room = roomOption!.availableRooms[0]

    const obj: TBookingCheck = {
      hotelId: values.hotelId!,
      roomId: room.id,
      checkIn: values.checkIn.format('YYYY-MM-DDThh:mm:ss.SSSZ'),
      checkOut: values.checkOut.format('YYYY-MM-DDThh:mm:ss.SSSZ')
    }

    const stayInfo: TStayInfo = {
      hotelId: obj.hotelId,
      roomId: obj.roomId,
      price: room.price,
      checkIn: obj.checkIn,
      checkOut: obj.checkOut
    }

    triggerCheckBooking(obj)
      .unwrap()
      .then(_res => onInitiateReservation(stayInfo))
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  const validationSchema = yup.object({
    hotelId: yup
      .number()
      .required(),
    roomType: yup
      .number()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      hotelId: undefined,
      roomType: undefined,
      checkIn: moment(),
      checkOut: moment(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleCheckBooking(values)
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box position='absolute' display='flex' justifyContent='center' bottom='3rem' className={classes.bookingLayout}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={hotels}
          onChange={(_e, v) => {
            formik.setFieldValue('hotelId', v?.id);
            setHotelId(v?.id)
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params}
            label="Select a hotel..."
            error={formik.touched.hotelId && Boolean(formik.errors.hotelId)} />}
        />

        <TextField
          name="roomType"
          variant="outlined"
          id="roomType"
          label="Room Type"
          sx={{ width: 300 }}
          select
          onChange={formik.handleChange}
          error={formik.touched.roomType && Boolean(formik.errors.roomType)}
        >
          {rooms.map(room => (
            <MenuItem key={room.roomType} value={room.roomType}>
              {room.roomTypeName}
            </MenuItem>
          ))}
        </TextField>

        <LocalizationProvider
          dateAdapter={AdapterMoment}

        >
          <DesktopDatePicker
            label="Check In"
            value={formik.values.checkIn}
            minDate={today}
            onChange={(newValue) => {
              formik.setFieldValue('checkIn', newValue);
            }}
            renderInput={(params) => <TextField {...params} sx={{ width: 150 }} />}
          />
        </LocalizationProvider>

        <LocalizationProvider
          dateAdapter={AdapterMoment}
        >
          <DesktopDatePicker
            label="Check Out"
            value={formik.values.checkOut}
            minDate={formik.values.checkIn}
            onChange={(newValue) => {
              formik.setFieldValue('checkOut', newValue);
            }}
            renderInput={(params) => <TextField {...params} sx={{ width: 150 }} />}
          />
        </LocalizationProvider>

        <Button variant="contained" type="submit" disabled={isLoading}>BOOK NOW</Button>
      </Box>
    </form>
  );

}

export default CheckReservation;