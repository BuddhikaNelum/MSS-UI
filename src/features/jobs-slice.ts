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
    openCreateDrawer: (state: IState) => {
      state.isOpenAgencyCreate = true;
    },
    closeCreateDrawer: (state: IState) => {
      state.isOpenAgencyCreate = false;
    },
    toggleDetailsDrawer: (state: IState) => {
      state.isOpenAgencyDetails = !state.isOpenAgencyDetails;
    }
  },
});

export const {
  openCreateDrawer,
  closeCreateDrawer,
  toggleDetailsDrawer,
} = jobsSlice.actions;

export const selectIsCreateDrawerOpen = (state: RootState) => state.jobs.isOpenAgencyCreate;
export const selectIsDetailsDrawerOpen = (state: RootState) => state.jobs.isOpenAgencyDetails;

export default jobsSlice.reducer;