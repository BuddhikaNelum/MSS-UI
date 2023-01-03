import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

interface IState {
  reload: boolean;
  isCreateReservationDrawerOpen: boolean;
  isOpenReservationDetails: boolean;
}

const initialState: IState = {
  reload: false,
  isCreateReservationDrawerOpen: false,
  isOpenReservationDetails: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateHotelReservation: (state: IState) => {
      state.isCreateReservationDrawerOpen = true;
    },
    closeCreateHotelReservation: (state: IState) => {
      state.isCreateReservationDrawerOpen = false;
    },
    toggleReservationDetails: (state: IState) => {
      state.isOpenReservationDetails = !state.isOpenReservationDetails;
    },
  },
});

export const {
  setReload,
  openCreateHotelReservation,
  closeCreateHotelReservation,
  toggleReservationDetails,
} = ordersSlice.actions;

export const selectShouldReloadRoomList = (state: RootState) => state.orders.reload;
export const selectIsCreateRecordDrawerOpen = (state: RootState) => state.orders.isCreateReservationDrawerOpen;
export const selectIsOpenReservationDetails = (state: RootState) => state.orders.isOpenReservationDetails;

export default ordersSlice.reducer;