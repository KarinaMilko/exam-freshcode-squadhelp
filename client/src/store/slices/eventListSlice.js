import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  events: JSON.parse(localStorage.getItem('events')) || [],
};

const eventListSlice = createSlice({
  initialState,
  name: 'events',
  reducers: {
    removeEvent: (state, { payload }) => {
      const foundEventIndex = state.events.findIndex(e => e.id === payload);
      if (foundEventIndex !== -1) {
        state.events.splice(foundEventIndex, 1);
        localStorage.setItem('events', JSON.stringify(state.events));
      }
    },
    createEvent: (state, { payload }) => {
      state.events.push({ ...payload, id: uuidv4() });
      localStorage.setItem('events', JSON.stringify(state.events));
    },
  },
});

const { reducer, actions } = eventListSlice;

export const { removeEvent, createEvent } = actions;

export default reducer;
