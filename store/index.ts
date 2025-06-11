import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import signinReducer from './signinSlice';
import signupReducer from './signupSlice';
import userReducer from './userSlice';
import zodiacChartReducer from './zodiacChartSlice';

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  zodiacChart: zodiacChartReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
