import {configureStore} from '@reduxjs/toolkit';
import countryListReducer from '../redux/reducer/countryList';

export const store = configureStore({
  reducer: {
    countryList: countryListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: false,
    }),
});
