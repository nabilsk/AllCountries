import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'countryList',
  initialState: {
    countryListData: [],
  },
  reducers: {
    setCountryListData: (state, action) => {
      state.countryListData = action.payload;
    },
  },
});

export const {setCountryListData} = appSlice.actions;

export default appSlice.reducer;
