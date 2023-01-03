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

export const jobsSlice = createSlice({
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
} = jobsSlice.actions;

export const selectIsOpenAgencyCreate = (state: RootState) => state.jobs.isOpenAgencyCreate;
export const selectIsOpenAgencyDetails = (state: RootState) => state.jobs.isOpenAgencyDetails;

export default jobsSlice.reducer;