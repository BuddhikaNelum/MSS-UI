import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { TEmployee } from 'types/employee';

interface IState {
  reload: boolean;
  employee: TEmployee | undefined;
  isCreateEmployeeDrawerOpen: boolean;
  isOpenEmployeeDetails: boolean;
}

const initialState: IState = {
  reload: false,
  employee: undefined,
  isCreateEmployeeDrawerOpen: false,
  isOpenEmployeeDetails: false
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateEmployee: (state: IState, action: PayloadAction<TEmployee | undefined>) => {
      state.isCreateEmployeeDrawerOpen = true;
    },
    closeCreateEmployee: (state: IState) => {
      state.isCreateEmployeeDrawerOpen = false;
    },
    openEmployeeDetailsDrawer: (state: IState, action: PayloadAction<TEmployee>) => {
      state.isOpenEmployeeDetails = !state.isOpenEmployeeDetails;
      state.employee = action.payload;
    },
    closeEmployeeDetailsDrawer: (state: IState) => {
      state.isOpenEmployeeDetails = !state.isOpenEmployeeDetails;
      state.employee = undefined;
    }
  },
});

export const {
  setReload,
  openCreateEmployee,
  closeCreateEmployee,
  openEmployeeDetailsDrawer,
  closeEmployeeDetailsDrawer,
} = employeeSlice.actions;

export const selectIsCreateRecordDrawerOpen = (state: RootState) => state.employee.isCreateEmployeeDrawerOpen;
export const selectShouldReloadEmployeeList = (state: RootState) => state.employee.reload;
export const selectIsOpenEmployeeDetails = (state: RootState) => state.employee.isOpenEmployeeDetails;
export const selectEmployee = (state: RootState) => state.employee.employee;

export default employeeSlice.reducer;