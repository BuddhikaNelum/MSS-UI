import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { THotelRoom } from 'types/hotelRoom';

interface IState {
  reload: boolean;
  hotelRoom: THotelRoom | undefined;
  hotels: Array<{ id: number, name: string }>;
  isCreateHotelDrawerOpen: boolean;
  isOpenHotelDetails: boolean;
}

const initialState: IState = {
  reload: false,
  hotelRoom: undefined,
  hotels: [],
  isCreateHotelDrawerOpen: false,
  isOpenHotelDetails: false
};

export const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateRoomDrawer: (state: IState, action: PayloadAction<THotelRoom | undefined>) => {
      state.isCreateHotelDrawerOpen = true;
      state.hotelRoom = action.payload;
    },
    closeCreateRoomDrawer: (state: IState) => {
      state.isCreateHotelDrawerOpen = false;
      state.hotelRoom = undefined;
    },
    openRoomDetailsDrawer: (state: IState, action: PayloadAction<THotelRoom>) => {
      state.isOpenHotelDetails = !state.isOpenHotelDetails;
      state.hotelRoom = action.payload;
    },
    closeRoomDetailsDrawer: (state: IState) => {
      state.isOpenHotelDetails = !state.isOpenHotelDetails;
      state.hotelRoom = undefined;
    },
    setHotels: (state: IState, action: PayloadAction<Array<{ id: number, name: string }>>) => {
      state.hotels = action.payload;
    },
  },
});

export const {
  setReload,
  openCreateRoomDrawer,
  closeCreateRoomDrawer,
  openRoomDetailsDrawer,
  closeRoomDetailsDrawer,
  setHotels
} = departmentsSlice.actions;

export const selectShouldReloadRoomList = (state: RootState) => state.departments.reload;
export const selectIsCreateRecordDrawerOpen = (state: RootState) => state.departments.isCreateHotelDrawerOpen;
export const selectIsOpenRoomDetails = (state: RootState) => state.departments.isOpenHotelDetails;
export const selectHotelRoom = (state: RootState) => state.departments.hotelRoom;
export const selectHotels = (state: RootState) => state.departments.hotels;

export default departmentsSlice.reducer;