import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { TOrder } from "types/order";

interface IState {
  reload: boolean;
  order: TOrder | undefined;
  isOpenCreateDrawer: boolean;
  isOpenDetailsDrawer: boolean;
}

const initialState: IState = {
  reload: false,
  order: undefined,
  isOpenCreateDrawer: false,
  isOpenDetailsDrawer: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateDrawer: (state: IState, action: PayloadAction<TOrder | undefined>) => {
      state.isOpenCreateDrawer = true;
      state.order = action.payload;
    },
    closeCreateDrawer: (state: IState) => {
      state.isOpenCreateDrawer = false;
    },
    toggleDetailsDrawer: (state: IState, action: PayloadAction<TOrder | undefined>) => {
      state.isOpenDetailsDrawer = action.payload !== undefined;
      state.order = action.payload;
    },
  },
});

export const { setReload, openCreateDrawer, closeCreateDrawer, toggleDetailsDrawer } = ordersSlice.actions;

export const selectShouldReload = (state: RootState) => state.orders.reload;
export const selectIsCreateDrawerOpen = (state: RootState) => state.orders.isOpenCreateDrawer;
export const selectIsDetailsDrawerOpen = (state: RootState) => ({
  isOpen: state.orders.isOpenDetailsDrawer,
  order: state.orders.order,
});

export default ordersSlice.reducer;
