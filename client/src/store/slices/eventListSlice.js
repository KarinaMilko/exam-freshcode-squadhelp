import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  events: [
    {
      id: uuidv4(),
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
    createEvent: (state, { payload }) => {
      state.events.push({ ...payload, id: uuidv4() });
    },
  },
});

const { reducer, actions } = eventListSlice;

export const { removeEvent, createEvent } = actions;

export default reducer;
