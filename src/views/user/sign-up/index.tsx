import { Avatar, Box, Button, colors, CssBaseline, Grid, MenuItem, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import { validatePhoneNumber } from "helpers/validations";
import { useSignUpMutation } from "api/authAPISlice";
import { useAppDispatch } from "hooks/hooks";
import { setErrorSnackbar, setSuccessSnackbar } from "features/app-slice";
import { useNavigate } from "react-router-dom";
import RouteRegistry from "routes/route-registry";
import { NavLink } from "react-router-dom";
import { TSignUpRequest } from "types/auth";
import { UserType } from "enums/userType";
import { useEffect } from "react";
import { useLazyGetDepartmentsQuery } from "api/departmentsAPISlice";

const userRoleOptions: { [key in keyof typeof UserType]: { label: string; value: number } } = {
  SUPERVISOR: { label: "Supervisor", value: UserType.SUPERVISOR },
  MANAGER: { label: "Manager", value: UserType.MANAGER },
  EMPLOYEE: { label: "Employee", value: UserType.EMPLOYEE },
};

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [triggerSignUp] = useSignUpMutation();
  const [triggerGetDepartments, { data }] = useLazyGetDepartmentsQuery();

  useEffect(() => {
    triggerGetDepartments();
  }, []);

  const validationSchema = yup.object({
    userType: yup.string().required("User type is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone is required")
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number")
      .test("phone-no-check", "Invalid phone number", (phone) => validatePhoneNumber(phone)),
    username: yup.string().required("Enter your first name"),
    departmentId: yup.string().required("Department is required"),
    password: yup.string().required("Password is required"),
    passwordConfirmation: yup
      .string()
      .required("Password confirmation is required")
      .test("password-check", "Password and password confirmation mismatch", (passwordConfirmation) => {
        const { password } = formik.values;
        return password == passwordConfirmation;
      }),
  });

  const formik = useFormik({
    initialValues: {
      userType: "1",
      username: "",
      email: "",
      phoneNumber: "",
      departmentId: "1",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const reqBody: TSignUpRequest = {
        username: values.username,
        email: values.email,
        phoneNumber: values.phoneNumber,
        departmentId: parseInt(values.departmentId, 10),
        userType: parseInt(values.userType, 10),
        password: values.password,
      };

      handleRegister(reqBody);
    },
  });

  /**
   * Handles sign up process.
   * @param values 
   */
  const handleRegister = async (values: any) => {
    triggerSignUp(values)
      .unwrap()
      .then((_res) => {
        dispatch(setSuccessSnackbar("You have registered successfully"));
        navigate(RouteRegistry.user.paths.signIn.path, { replace: true });
      })
      .catch((err) => dispatch(setErrorSnackbar(err)));
  };

  return (
    <Box sx={{ width: "458px", margin: "auto", padding: "1.5rem", backgroundColor: colors.common.white }} boxShadow={2}>
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
            autoComplete="username"
            margin="normal"
            name="username"
            variant="outlined"
            fullWidth
            id="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            autoFocus
          />

          <TextField
            select
            variant="outlined"
            margin="normal"
            fullWidth
            id="userType"
            label="User Type"
            name="userType"
            value={formik.values.userType}
            onChange={formik.handleChange}
            error={formik.touched.userType && Boolean(formik.errors.userType)}
            helperText={formik.touched.userType && formik.errors.userType}
          >
            {Object.keys(userRoleOptions).map((key) => (
              <MenuItem key={userRoleOptions[key].value} value={userRoleOptions[key].value}>
                {userRoleOptions[key].label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          <TextField
            select
            fullWidth
            variant="outlined"
            margin="normal"
            id="departmentId"
            label="Department"
            name="departmentId"
            autoComplete="departmentId"
            value={formik.values.departmentId}
            onChange={formik.handleChange}
            error={formik.touched.departmentId && Boolean(formik.errors.departmentId)}
            helperText={formik.touched.departmentId && formik.errors.departmentId}
          >
            {(data || []).map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
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

          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>

          <Grid container marginTop="1rem" justifyContent="center">
            <Grid item>
              <NavLink to={RouteRegistry.user.paths.signIn.path}>Already have an account? Sign in</NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Box>
  );
}
