import { useEffect } from "react";
import { Box, Drawer, TextField, Button } from "@mui/material";
import DrawerHeader from "components/drawer-header";
import { closeCreateHotelDrawer, selectHotel, selectIsCreateRecordDrawerOpen, setReload } from "features/inventory-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useCreateHotelMutation, useUpdateHotelMutation } from "api/inventoryAPISlice";
import { THotelCreate } from "types/hotel";
import { setErrorSnackbar } from "features/app-slice";
import { validatePhoneNumber } from "helpers/validations";

const DepartmentsCreate = () => {
  const dispatch = useAppDispatch();
  const [triggerCreateHotel, { isLoading: isCreateLoading }] = useCreateHotelMutation();
  const [triggerUpdateHotelRoom, { isLoading: isUpdateLoading }] = useUpdateHotelMutation();

  const isOpen = useAppSelector(selectIsCreateRecordDrawerOpen);
  const hotel = useAppSelector(selectHotel)

  useEffect(() => {
    if (isOpen) {
      formik.resetForm()
    }
  }, [isOpen])

  const handleClose = () => dispatch(closeCreateHotelDrawer());

  const handleCreateHotel = async (obj: THotelCreate) => {
    triggerCreateHotel(obj)
      .unwrap()
      .then(_res => {
        handleClose();
        dispatch(setReload(true))
      })
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  const handleUpdateHotel = async (obj: THotelCreate) => {
    triggerUpdateHotelRoom(obj)
      .unwrap()
      .then(_res => {
        handleClose();
        dispatch(setReload(true))
      })
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Hotel name is required'),
    address: yup
      .string()
      .required('Address is required'),
    // email: yup
    //   .string()
    //   .email('Enter a valid email')
    //   .required('Email is required'),
    phone: yup
      .string()
      .required('Phone is required')
      .min(10, 'Invalid phone number')
      .max(10, 'Invalid phone number')
      .test('phone-no-check', 'Invalid phone number', (phone) => (validatePhoneNumber(phone))),
    // classification: yup
    //   .number()
    //   .required('Star classification is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: hotel?.name ?? '',
      address: hotel?.adress ?? '',
      // email: '',
      phone: hotel?.contact ?? '',
      // classification: 2,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const obj: THotelCreate = {
        id: hotel?.id ?? undefined,
        name: values.name,
        address: values.address,
        contact: values.phone,
        userId: 4
      }

      hotel?.id
        ? handleUpdateHotel(obj)
        : handleCreateHotel(obj)
    }
  });

  return (
    <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 500, overflow: 'auto', padding: 3 }}>
        <DrawerHeader title={"Create Hotel"} onClose={handleClose} />

        <Box role="presentation">

          <Box display='flex' flexDirection='column' marginBottom={2}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                label="Hotel Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
              />

              <TextField
                name="address"
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                margin="normal"
                id="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                autoFocus
              />

              {/* <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              /> */}

              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              {/* <FormControl fullWidth margin="normal">
                <InputLabel id="star-classification">Star Classification</InputLabel>
                <Select
                  labelId="star-classification"
                  id="classification"
                  name="classification"
                  label="Star Classification"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={2}>2 Start</MenuItem>
                  <MenuItem value={3}>3 Start</MenuItem>
                  <MenuItem value={4}>4 Start</MenuItem>
                  <MenuItem value={5}>5 Start</MenuItem>
                </Select>
              </FormControl> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isCreateLoading || isUpdateLoading}
                color="primary"
                sx={{ margin: "normal" }}
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

export default DepartmentsCreate;