import { Alert, Avatar, Box, Button, Checkbox, colors, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSignInMutation } from 'api/authAPISlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hooks';
import { setErrorSnackbar } from 'features/app-slice';
import RouteRegistry from 'routes/route-registry';
import { setCurrentUser, setValue } from 'utils/storage-util';
import { TUser } from 'types/auth';
import { NavLink } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [triggerSignIn, { isError, isLoading }] = useSignInMutation();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const reqBody = {
        email: values.email,
        password: values.password
      }

      handleLogin(reqBody)
    }
  });

  const handleLogin = async (values: any) => {
    triggerSignIn(values)
      .unwrap()
      .then(res => {
        setValue(process.env.REACT_APP_USER_SESSION!, res.token)

        const user: TUser = {
          name: res.name,
          userType: res.userType,
          userId: res.userId,
          businessRegNo: res.businessRegNo
        }

        setCurrentUser(user);
        window.location.reload();
      })
      .catch(_err => {});
  }

  return (
    <Box sx={{ width: '458px', margin: 'auto', padding: '1.5rem', backgroundColor: colors.common.white }} boxShadow={2}>
      <CssBaseline />
      <div>
        <Avatar sx={{ marginX: "auto", marginBottom: "1rem" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" textAlign="center">
          Sign in
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {
            (isError && !isLoading) &&
            <Alert severity='error'>
              Invalid email and/or password
            </Alert>
          }

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
            autoFocus
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container marginTop="1rem" justifyContent='center'>
            <Grid item>
              <NavLink to={RouteRegistry.user.paths.signUp.path}>Don't have an account? Sign Up</NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box>
  );
}

export default SignIn;