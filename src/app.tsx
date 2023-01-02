import { ToastProvider } from 'react-toast-notifications';
import AppRoutes from 'routes';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import MomentUtils from '@date-io/moment';
import theme from 'theme';
import AppSnackbar from 'components/snackbar';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ToastProvider>
            <div>
              <AppRoutes />
              <AppSnackbar />
            </div>
          </ToastProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
