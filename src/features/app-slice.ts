import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppScreen } from 'enums/screen';
import { getSnackBarError } from 'helpers/snackbar';
import { RootState } from 'store/store';
import { TUser } from 'types/auth';
import { TSnackbar } from 'types/snackbar';

interface IState {
  currScreen: AppScreen;
  snackbar: TSnackbar;
  user: TUser | undefined;
}

const initialState: IState = {
  currScreen: AppScreen.DASHBOARD,
  snackbar: { message: undefined, open: false, alertSeverity: undefined },
  user: undefined
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrUser: (state: IState, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setCurrScreen: (state: IState, action: PayloadAction<AppScreen>) => {
      state.currScreen = action.payload;
    },
    setSuccessSnackbar: (state: IState, action: PayloadAction<any>) => {
      const message: string = getSnackBarError(action.payload);
      state.snackbar = { message, open: true, alertSeverity: 'success' };
    },
    setErrorSnackbar: (state: IState, action: PayloadAction<any>) => {
      const message: string = getSnackBarError(action.payload);
      state.snackbar = { message, open: true, alertSeverity: 'error' };
    },
    setInfoSnackbar: (state: IState, action: PayloadAction<any>) => {
      const message: string = getSnackBarError(action.payload);
      state.snackbar = { message, open: true, alertSeverity: 'info' };
    },
    closeSnackbar: (state: IState) => {
      state.snackbar = { ...state.snackbar, open: false };
    },
  },
});

export const {
  setCurrUser,
  setCurrScreen,
  setSuccessSnackbar,
  setErrorSnackbar,
  setInfoSnackbar,
  closeSnackbar,
} = appSlice.actions;

export const selectCurrScreen = (state: RootState) => state.app.currScreen;
export const selectCurrUser = (state: RootState) => state.app.user;
export const selectSnackbar = (state: RootState) => state.app.snackbar;

export default appSlice.reducer;