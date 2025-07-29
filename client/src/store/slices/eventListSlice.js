import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { countCompletedEvents } from '../../utils/functions';

const initialState = {
  events: JSON.parse(localStorage.getItem('events')) || [],
  completedEventsCount: 0,
};

const eventListSlice = createSlice({
  initialState,
  name: 'events',
  reducers: {
    removeEvent: (state, { payload }) => {
      const foundEventIndex = state.events.findIndex(e => e.id === payload);
      if (foundEventIndex !== -1) {
        state.events.splice(foundEventIndex, 1);
      }
    },
    createEvent: (state, { payload }) => {
      state.events.push({ ...payload, id: uuidv4() });
    },
    hideMessage: (state, { payload }) => {
      const event = state.events.find(e => e.id === payload);
      if (event) {
        event.isMessageVisible = false;
      }
    },
    updateCompletedEventsCount: (state, { payload }) => {
      state.completedEventsCount = payload;
    },
  },
});

const { reducer, actions } = eventListSlice;

export const {
  removeEvent,
  createEvent,
  hideMessage,
  updateCompletedEventsCount,
} = actions;

export const selectCompletedEventsCount = state =>
  countCompletedEvents(state.eventList.events);

export default reducer;
