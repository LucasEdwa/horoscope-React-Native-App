import { configureStore } from '@reduxjs/toolkit';
import signinReducer from './signinSlice';
import signupReducer from './signupSlice';
import zodiacChartReducer from './zodiacChartSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    zodiacChart: zodiacChartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
