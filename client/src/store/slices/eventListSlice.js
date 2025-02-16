import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [
    {
      id: 1,
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
  reducers: {
    removeEvent: (state, { payload }) => {
      const foundEventIndex = state.events.findIndex(e => e.id === payload);
      if (foundEventIndex !== 1) {
        state.events.splice(foundEventIndex, 1);
      }
    },
  },
});

const { reducer, actions } = eventListSlice;

export const { removeEvent } = actions;

export default reducer;
