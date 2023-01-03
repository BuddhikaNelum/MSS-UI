import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { TEmployee } from 'types/employee';

interface IState {
  reload: boolean;
  employee: TEmployee | undefined;
  isOpenCreateDrawer: boolean;
  isOpenDetailsDrawer: boolean;
}

const initialState: IState = {
  reload: false,
  employee: undefined,
  isOpenCreateDrawer: false,
  isOpenDetailsDrawer: false
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateDrawer: (state: IState, action: PayloadAction<TEmployee | undefined>) => {
      state.isOpenCreateDrawer = true;
    },
    closeCreateDrawer: (state: IState) => {
      state.isOpenCreateDrawer = false;
    },
    toggleDetailsDrawer: (state: IState, action: PayloadAction<TEmployee>) => {
      state.isOpenDetailsDrawer = !state.isOpenDetailsDrawer;
      state.employee = action.payload;
    }
  },
});

export const {
  setReload,
  openCreateDrawer,
  closeCreateDrawer,
  toggleDetailsDrawer
} = employeesSlice.actions;

export const selectShouldReload = (state: RootState) => state.employee.reload;
export const selectEmployee = (state: RootState) => state.employee.employee;
export const selectIsCreateDrawerOpen = (state: RootState) => state.employee.isOpenCreateDrawer;
export const selectIsDetailsDrawerOpen = (state: RootState) => state.employee.isOpenDetailsDrawer;

export default employeesSlice.reducer;