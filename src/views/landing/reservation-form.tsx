import { Box, MenuItem, TextField, Typography, useTheme, Button, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useCreateBookingMutation, usePayLaterMutation } from 'api/jobsAPISlice';
import { UserType } from 'enums/userType';
import { setErrorSnackbar, setSuccessSnackbar } from 'features/app-slice';
import { useFormik } from 'formik';
import { validatePhoneNumber } from 'helpers/validations';
import { useAppDispatch } from 'hooks/hooks';
import { TBookingCreate, TPayLater, TStayInfo } from 'types/reservation';
import * as yup from 'yup';

interface IProps {
  stayInfo: TStayInfo
  onClose: () => void
}

const ReservationForm = ({ stayInfo, onClose }: IProps) => {
  const mdTheme = useTheme();
  const dispatch = useAppDispatch();

  const [triggerCreateBooking, { isLoading: isLoadingBooking }] = useCreateBookingMutation();
  const [triggerPayLater, { isLoading: isLoadingPayLater }] = usePayLaterMutation();

  const handleCreateBooking = async (values: TBookingCreate) => {
    triggerCreateBooking(values)
      .unwrap()
      .then(res => {
        if (formik.values.payNow) {
          window.open(res.checkoutUrl, "_self")
          onClose()
        } else {
          const obj: TPayLater = {
            email: values.guestDto.email,
            name: `${values.guestDto.title}.${values.guestDto.firstName} ${values.guestDto.lastName}`,
            paymentUrl: res.checkoutUrl
          }

          handlePayLater(obj)
        }
      })
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  const handlePayLater = (values: TPayLater) => {
    triggerPayLater(values)
      .unwrap()
      .then(res => {
        dispatch(setSuccessSnackbar('You successfully initiated a booking. Please check you email to proceed with the payment.'))
        onClose()
      })
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  const validationSchema = yup.object({
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
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      payNow: true
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
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
        bookedUserType: UserType.CUSTOMER,
        specialNotes: values.notes
      }

      handleCreateBooking(obj);
    }
  });

  return (
    <Box borderRadius={2} marginTop={2} sx={{ padding: 2.5, border: `1px solid ${mdTheme.palette.grey[200]}` }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant='h6'>Personal Information</Typography>

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

        <FormGroup sx={{ margin: "normal" }}>
          <FormControlLabel
            id='payNow'
            control={<Checkbox
              checked={formik.values.payNow}
              onChange={(_event, checked) => { formik.setFieldValue('payNow', checked) }} />}
            label="Pay now" />
        </FormGroup>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoadingBooking}
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Create
        </Button>
      </form>
    </Box>
  );

}

export default ReservationForm;