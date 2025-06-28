import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './userSlice';
import zodiacChartReducer from './zodiacChartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  zodiacChart: zodiacChartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
