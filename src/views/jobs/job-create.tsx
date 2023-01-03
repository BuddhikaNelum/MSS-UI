import { Box, Drawer, TextField, Button } from "@mui/material";
import DrawerHeader from "components/drawer-header";
import { selectIsCreateDrawerOpen, closeCreateDrawer } from "features/jobs-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useFormik } from 'formik';
import * as yup from 'yup';

const JobCreate = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsCreateDrawerOpen);

  const handleClose = () => dispatch(closeCreateDrawer());

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    phone: yup
      .string()
      .required('Phone is required'),
    firstName: yup
      .string()
      .required('Enter your first name'),
    lastName: yup
      .string()
      .required('Enter your last name'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => { }
  });

  return (
    <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={{ width: 500, overflow: 'auto', padding: 3 }}>
        <DrawerHeader title={"Create Employee"} onClose={handleClose} />

        <Box role="presentation">

          <Box display='flex' flexDirection='column' marginBottom={2}>
            <form onSubmit={formik.handleSubmit}>

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
                autoComplete="phone"
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
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

export default JobCreate;