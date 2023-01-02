import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { THotel } from 'types/hotel';

interface IState {
  reload: boolean;
  hotel: THotel | undefined;
  isCreateHotelDrawerOpen: boolean;
  isOpenHotelDetails: boolean;
}

const initialState: IState = {
  reload: false,
  hotel: undefined,
  isCreateHotelDrawerOpen: false,
  isOpenHotelDetails: false
};

export const hotelSlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateHotelDrawer: (state: IState, action: PayloadAction<THotel | undefined>) => {
      state.isCreateHotelDrawerOpen = true;
      state.hotel = action.payload;
    },
    closeCreateHotelDrawer: (state: IState) => {
      state.isCreateHotelDrawerOpen = false;
      state.hotel = undefined;
    },
    openHotelDetailsDrawer: (state: IState, action: PayloadAction<THotel>) => {
      state.isOpenHotelDetails = !state.isOpenHotelDetails;
      state.hotel = action.payload;
    },
    closeHotelDetailsDrawer: (state: IState) => {
      state.isOpenHotelDetails = !state.isOpenHotelDetails;
      state.hotel = undefined;
    }
  },
});

export const {
  setReload,
  openCreateHotelDrawer,
  closeCreateHotelDrawer,
  openHotelDetailsDrawer,
  closeHotelDetailsDrawer
} = hotelSlice.actions;

export const selectShouldReloadHotelList = (state: RootState) => state.hotel.reload;
export const selectIsCreateRecordDrawerOpen = (state: RootState) => state.hotel.isCreateHotelDrawerOpen;
export const selectIsOpenHotelDetails = (state: RootState) => state.hotel.isOpenHotelDetails;
export const selectHotel = (state: RootState) => state.hotel.hotel;

export default hotelSlice.reducer;