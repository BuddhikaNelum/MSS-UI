import { Alert, Snackbar } from "@mui/material";
import { closeSnackbar, selectSnackbar } from "features/app-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";

const AppSnackbar = () => {
  const dispatch = useAppDispatch();

  const { open, message, alertSeverity } = useAppSelector(selectSnackbar);

  const handleClose = () => dispatch(closeSnackbar());

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackbar;