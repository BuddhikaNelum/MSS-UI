import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { TJob } from "types/job";

interface IState {
  reload: boolean;
  job: TJob | undefined;
  isOpenAgencyCreate: boolean;
  isOpenAgencyDetails: boolean;
}

const initialState: IState = {
  reload: false,
  isOpenAgencyCreate: false,
  isOpenAgencyDetails: false,
  job: undefined,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateDrawer: (state: IState) => {
      state.isOpenAgencyCreate = true;
    },
    closeCreateDrawer: (state: IState) => {
      state.isOpenAgencyCreate = false;
    },
    toggleDetailsDrawer: (state: IState, action: PayloadAction<TJob | undefined>) => {
      state.isOpenAgencyDetails = action.payload !== undefined;
      state.job = action.payload;
    },
  },
});

export const { setReload, openCreateDrawer, closeCreateDrawer, toggleDetailsDrawer } = jobsSlice.actions;

export const selectShouldReload = (state: RootState) => state.jobs.reload;
export const selectIsCreateDrawerOpen = (state: RootState) => state.jobs.isOpenAgencyCreate;
export const selectIsDetailsDrawerOpen = (state: RootState) => ({
  isOpen: state.jobs.isOpenAgencyDetails,
  job: state.jobs.job,
});

export default jobsSlice.reducer;
