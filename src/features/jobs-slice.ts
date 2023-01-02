import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

interface IState {
  isOpenAgencyCreate: boolean;
  isOpenAgencyDetails: boolean;
}

const initialState: IState = {
  isOpenAgencyCreate: false,
  isOpenAgencyDetails: false,
};

export const reservationSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    openCreateAgency: (state: IState) => {
      state.isOpenAgencyCreate = true;
    },
    closeCreateAgency: (state: IState) => {
      state.isOpenAgencyCreate = false;
    },
    toggleAgencyDetails: (state: IState) => {
      state.isOpenAgencyDetails = !state.isOpenAgencyDetails;
    }
  },
});

export const {
  openCreateAgency,
  closeCreateAgency,
  toggleAgencyDetails,
} = reservationSlice.actions;

export const selectIsOpenAgencyCreate = (state: RootState) => state.travelAgency.isOpenAgencyCreate;
export const selectIsOpenAgencyDetails = (state: RootState) => state.travelAgency.isOpenAgencyDetails;

export default reservationSlice.reducer;