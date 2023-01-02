import { Box, Drawer, TextField, Button, MenuItem } from "@mui/material";
import DrawerHeader from "components/drawer-header";
import { closeCreateEmployee, selectIsCreateRecordDrawerOpen, setReload } from "features/employees-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TEmployeeCreate } from "types/employee";
import { employeeTypeOptions } from "./metadata";
import { UserType } from "enums/userType";
import { useCreateEmployeeMutation } from "api/employeeAPISlice";
import { setErrorSnackbar } from "features/app-slice";
import { validatePhoneNumber } from "helpers/validations";

const EmployeeCreate = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsCreateRecordDrawerOpen);
  const [triggerCreateEmployee, { isLoading }] = useCreateEmployeeMutation();

  const handleClose = () => dispatch(closeCreateEmployee());

  const validationSchema = yup.object({
    userType: yup
      .number()
      .required("Employee role is required"),
    name: yup
      .string()
      .required('Name is required'),
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
    password: yup
      .string()
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      userType: undefined,
      name: '',
      email: '',
      phone: '',
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const obj: TEmployeeCreate = {
        userType: values.userType!,
        email: values.email,
        name: values.name,
        phone: values.phone,
        password: values.password
      }

      handleCreateEmployee(obj)
    }
  });

  const handleCreateEmployee = async (obj: TEmployeeCreate) => {
    debugger
    triggerCreateEmployee(obj)
      .unwrap()
      .then(_res => {
        handleClose();
        dispatch(setReload(true))
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
        <DrawerHeader title={"Create Employee"} onClose={handleClose} />

        <Box role="presentation">

          <Box display='flex' flexDirection='column' marginBottom={2}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="userType"
                variant="outlined"
                fullWidth
                margin="normal"
                id="userType"
                label="Employee Role"
                select
                onChange={formik.handleChange}
                error={formik.touched.userType && Boolean(formik.errors.userType)}
                helperText={formik.touched.userType && formik.errors.userType}
                autoFocus
              >
                {Object.keys(employeeTypeOptions).map(key => (
                  <MenuItem key={UserType[key]} value={UserType[key]}>
                    {employeeTypeOptions[key]}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                autoComplete="name"
                margin="normal"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Employee Name"
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
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

export default EmployeeCreate;