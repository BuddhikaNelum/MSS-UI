import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Drawer, FormControl, TextField, MenuItem, Autocomplete } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { closeCreateHotelReservation, selectIsCreateRecordDrawerOpen } from "features/orders-slice";
import DrawerHeader from "components/drawer-header";
import { THotelRoomOption } from 'types/hotelRoom';
import { useLazyFilterHotelsQuery } from 'api/inventoryAPISlice';
import { useLazyFilterRoomsByHotelIdQuery } from 'api/ordersAPISlice';
import { RoomType } from 'enums/roomType';
import { useCheckBookingMutation, useCreateBookingMutation, usePayLaterMutation } from 'api/jobsAPISlice';
import { selectCurrUser, setErrorSnackbar, setSuccessSnackbar } from 'features/app-slice';
import { TBookingCheck, TBookingCreate, TPayLater, TStayInfo } from 'types/reservation';
import { validatePhoneNumber } from 'helpers/validations';

const InventoryCreate = () => {
  const dispatch = useAppDispatch();

  const [hotels, setHotels] = useState<Array<{ id: number, label: string }>>([]);
  const [rooms, setRooms] = useState<Array<THotelRoomOption>>([]);
  const [hotelId, setHotelId] = useState<number | undefined>(undefined);

  const today = moment();
  const isOpen = useAppSelector(selectIsCreateRecordDrawerOpen);
  const user = useAppSelector(selectCurrUser)

  const [triggerFilterHotels] = useLazyFilterHotelsQuery();
  const [triggerGetRoomsByHotelId] = useLazyFilterRoomsByHotelIdQuery();
  const [triggerCheckBooking] = useCheckBookingMutation();
  const [triggerCreateBooking, { isLoading: isLoadingBooking }] = useCreateBookingMutation();
  const [triggerPayLater, { isLoading: isLoadingPayLater }] = usePayLaterMutation();

  const handleClose = () => dispatch(closeCreateHotelReservation());

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

  const validationSchema = yup.object({
    hotelId: yup
      .number()
      .required(),
    roomType: yup
      .number()
      .required(),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    phone: yup
      .string()
      .required('Phone is required')
      .min(10, 'Invalid phone number')
      .max(10, 'Invalid phone number')
      .test('phone-no-check', 'Invalid phone number', (phone) => (validatePhoneNumber(phone))),
    firstName: yup
      .string()
      .required('Enter your first name'),
    lastName: yup
      .string()
      .required('Enter your last name'),
    title: yup
      .string()
      .required('Select a title'),
  });

  const formik = useFormik({
    initialValues: {
      hotelId: undefined,
      roomType: undefined,
      checkIn: moment(),
      checkOut: moment(),
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleCheckBooking(values)
  });

  const handleCheckBooking = async (values) => {
    const roomOption = rooms.find(r => r.roomType === values.roomType)
    const room = roomOption!.availableRooms[0]

    const obj: TBookingCheck = {
      hotelId: values.hotelId!,
      roomId: room.id,
      checkIn: values.checkIn.format('YYYY-MM-DDThh:mm:ss.SSSZ'),
      checkOut: values.checkOut.format('YYYY-MM-DDThh:mm:ss.SSSZ')
    }

    triggerCheckBooking(obj)
      .unwrap()
      .then(_res => handleCreateBooking(values, { ...obj, price: room.price }))
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  const handleCreateBooking = async (values, stayInfo: TStayInfo) => {
    const obj: TBookingCreate = {
      guestDto: {
        email: values.email,
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phone
      },
      hotelId: stayInfo.hotelId,
      roomId: stayInfo.roomId,
      checkIn: stayInfo.checkIn,
      checkOut: stayInfo.checkOut,
      amount: stayInfo.price,
      bookedUserType: user!.userType,
      specialNotes: values.notes
    }

    triggerCreateBooking(obj)
      .unwrap()
      .then(res => {
        const obj: TPayLater = {
          email: values.email,
          name: `${values.title}.${values.firstName} ${values.lastName}`,
          paymentUrl: res.checkoutUrl
        }

        handlePayLater(obj)
      })
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  const handlePayLater = async (values: TPayLater) => {
    triggerPayLater(values)
      .unwrap()
      .then(_res => {
        dispatch(setSuccessSnackbar('Booking placed successfully.'))
        handleClose()
      })
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  return (
    <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 500, overflow: 'auto', padding: 3 }}>
        <DrawerHeader title={"Create Reservation"} onClose={handleClose} />

        <Box role="presentation">

          <Box display='flex' flexDirection='column' marginBottom={2}>
            <form onSubmit={formik.handleSubmit}>

              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={hotels}
                onChange={(_e, v) => {
                  formik.setFieldValue('hotelId', v?.id);
                  setHotelId(v?.id)
                }}
                renderInput={(params) => <TextField {...params}
                  margin="normal"
                  label="Select a hotel..."
                  error={formik.touched.hotelId && Boolean(formik.errors.hotelId)} />}
              />

              <TextField
                fullWidth
                name="roomType"
                variant="outlined"
                id="roomType"
                label="Room Type"
                margin="normal"
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

              <Box display={'flex'} gap={1} marginTop={2}>
                <FormControl fullWidth variant="outlined">
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
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>

                <FormControl fullWidth variant="outlined">
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
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Box>

              <TextField
                name="title"
                variant="outlined"
                fullWidth
                margin="normal"
                id="title"
                label="Title"
                select
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                autoFocus
              >
                <MenuItem value='Mr'>Mr</MenuItem>
                <MenuItem value='Mrs'>Ms</MenuItem>
                <MenuItem value='Mrs'>Mrs</MenuItem>
                <MenuItem value='Mrs'>Dr</MenuItem>
              </TextField>

              <TextField
                autoComplete="name"
                margin="normal"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />

              <TextField
                autoComplete="name"
                margin="normal"
                name="lastName"
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="phone"
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <TextField
                name="notes"
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                margin="normal"
                id="notes"
                label="Notes (optional)"
                onChange={formik.handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Create
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

export default InventoryCreate;