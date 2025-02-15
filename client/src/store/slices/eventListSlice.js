import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [
    {
      eventName: '',
      date: '',
      time: '',
      timeOutMessage: '',
    },
  ],
};

const eventListSlice = createSlice({
  initialState,
  name: 'events',
  reducers: {},
});

const { reducer } = eventListSlice;

export default reducer;
