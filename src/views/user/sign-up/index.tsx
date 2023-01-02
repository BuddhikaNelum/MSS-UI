import {
  Avatar,
  Box,
  Button,
  colors,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { validatePhoneNumber } from 'helpers/validations';
import { UserType } from 'enums/userType';
import { useSignUpMutation } from 'api/authAPISlice';
import { useAppDispatch } from 'hooks/hooks';
import { setErrorSnackbar, setSuccessSnackbar } from 'features/app-slice';
import { useNavigate } from 'react-router-dom';
import RouteRegistry from 'routes/route-registry';
import { NavLink } from 'react-router-dom';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [triggerSignUp] = useSignUpMutation();

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
    name: yup
      .string()
      .required('Enter your first name'),
    businessRegNo: yup
      .string()
      .required('Enter your business registration #'),
    password: yup
      .string()
      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .required('Password confirmation is required')
      .test('password-check', 'Password and password confirmation mismatch', (passwordConfirmation) => {
        const { password } = formik.values;
        return password == passwordConfirmation;
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      name: '',
      businessRegNo: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const reqBody = {
        email: values.email,
        name: values.name,
        phone: values.phone,
        businessRegNo: values.businessRegNo,
        userType: UserType.TRAVEL_AGENCY,
        password: values.password
      }

      handleRegister(reqBody);
    }
  });

  const handleRegister = async (values: any) => {
    triggerSignUp(values)
      .unwrap()
      .then(_res => {
        dispatch(setSuccessSnackbar("You have registered successfully"))
        navigate(RouteRegistry.user.paths.signIn.path, { replace: true })
      })
      .catch(err => dispatch(setErrorSnackbar(err)));
  }

  return (
    <Box sx={{ width: '458px', margin: 'auto', padding: '1.5rem', backgroundColor: colors.common.white }} boxShadow={2}>
      <CssBaseline />
      <div>
        <Avatar sx={{ marginX: "auto", marginBottom: "1rem" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" textAlign="center">
          Sign up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoComplete="name"
            margin="normal"
            name="name"
            variant="outlined"
            fullWidth
            id="name"
            label="Name"
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            autoFocus
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
            id="email"
            label="Email Address"
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
            id="businessRegNo"
            label="Business Registration #"
            name="businessRegNo"
            autoComplete="businessRegNo"
            onChange={formik.handleChange}
            error={formik.touched.businessRegNo && Boolean(formik.errors.businessRegNo)}
            helperText={formik.touched.businessRegNo && formik.errors.businessRegNo}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            id="password-confirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          />

          {/* <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I have read and agreed to the terms and conditions."
          /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>

          <Grid container marginTop="1rem" justifyContent='center'>
            <Grid item>
              <NavLink to={RouteRegistry.user.paths.signIn.path}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box >
  );
}