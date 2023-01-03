import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { TOrder } from "types/order";

interface IState {
  reload: boolean;
  department: any;
  isOpenCreateDrawer: boolean;
  isOpenDetailsDrawer: boolean;
}

const initialState: IState = {
  reload: false,
  department: undefined,
  isOpenCreateDrawer: false,
  isOpenDetailsDrawer: false,
};

export const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateDrawer: (
      state: IState,
      action: PayloadAction<TOrder | undefined>
    ) => {
      state.isOpenCreateDrawer = true;
    },
    closeCreateDrawer: (state: IState) => {
      state.isOpenCreateDrawer = false;
    },
    toggleDetailsDrawer: (state: IState, action: PayloadAction<any>) => {
      state.isOpenDetailsDrawer = !state.isOpenDetailsDrawer;
    },
  },
});

export const {
  setReload,
  openCreateDrawer,
  closeCreateDrawer,
  toggleDetailsDrawer,
} = departmentsSlice.actions;

export const selectShouldReload = (state: RootState) =>
  state.departments.reload;
export const selectIsCreateDrawerOpen = (state: RootState) =>
  state.departments.isOpenCreateDrawer;
export const selectIsDetailsDrawerOpen = (state: RootState) =>
  state.departments.isOpenDetailsDrawer;
  export const selectDepartment = (state: RootState) => state.departments.department;

export default departmentsSlice.reducer;
