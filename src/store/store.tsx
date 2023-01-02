import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiSlice as jobsAPISlice } from 'api/jobsAPISlice';
import { apiSlice as authAPISlice } from 'api/authAPISlice';
import { apiSlice as inventoryAPISlice } from 'api/inventoryAPISlice';
import { apiSlice as ordersAPISlice } from 'api/ordersAPISlice';
import { apiSlice as departmentsAPISlice } from 'api/departmentsAPISlice';
import { apiSlice as employeeAPISlice } from 'api/employeeAPISlice';
import appReducer from 'features/app-slice';
import inventoryReducer from 'features/inventory-slice';
import departmentsReducer from 'features/departments-slice';
import ordersReducer from 'features/orders-slice';
import employeesReducer from 'features/employees-slice';
import jobsReducer from 'features/jobs-slice';

const reducers = combineReducers({
  [jobsAPISlice.reducerPath]: jobsAPISlice.reducer,
  [authAPISlice.reducerPath]: authAPISlice.reducer,
  [inventoryAPISlice.reducerPath]: inventoryAPISlice.reducer,
  [ordersAPISlice.reducerPath]: ordersAPISlice.reducer,
  [departmentsAPISlice.reducerPath]: departmentsAPISlice.reducer,
  [employeeAPISlice.reducerPath]: employeeAPISlice.reducer,
  app: appReducer,
  inventory: inventoryReducer,
  departments: departmentsReducer,
  orders: ordersReducer,
  employee: employeesReducer,
  jobs: jobsReducer,
});

export const store = configureStore({
  reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch