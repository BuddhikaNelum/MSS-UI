import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { TInventory } from 'types/inventory';

interface IState {
  reload: boolean;
  inventory: any;
  isOpenCreateDrawer: boolean;
  isOpenDetailsDrawer: boolean;
}

const initialState: IState = {
  reload: false,
  inventory: undefined,
  isOpenCreateDrawer: false,
  isOpenDetailsDrawer: false,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setReload: (state: IState, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
    openCreateDrawer: (
      state: IState,
      action: PayloadAction<TInventory | undefined>
    ) => {
      state.isOpenCreateDrawer = true;
    },
    closeCreateDrawer: (state: IState) => {
      state.isOpenCreateDrawer = false;
    },
    toggleDetailsDrawer: (state: IState, action: PayloadAction<TInventory | undefined>) => {
      state.isOpenDetailsDrawer = !state.isOpenDetailsDrawer;
    },
  },
});

export const {
  setReload,
  openCreateDrawer,
  closeCreateDrawer,
  toggleDetailsDrawer,
} = inventorySlice.actions;

export const selectShouldReload = (state: RootState) =>
  state.departments.reload;
export const selectIsCreateDrawerOpen = (state: RootState) =>
  state.departments.isOpenCreateDrawer;
export const selectIsDetailsDrawerOpen = (state: RootState) =>
  state.departments.isOpenDetailsDrawer;

export default inventorySlice.reducer;