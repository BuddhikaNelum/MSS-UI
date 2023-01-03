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

export const inventorySlice = createSlice({
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
} = inventorySlice.actions;

export const selectShouldReloadHotelList = (state: RootState) => state.inventory.reload;
export const selectIsCreateRecordDrawerOpen = (state: RootState) => state.inventory.isCreateHotelDrawerOpen;
export const selectIsOpenHotelDetails = (state: RootState) => state.inventory.isOpenHotelDetails;
export const selectHotel = (state: RootState) => state.inventory.hotel;

export default inventorySlice.reducer;