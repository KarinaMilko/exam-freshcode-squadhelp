import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
        localStorage.setItem('events', JSON.stringify(state.events));
      }
    },
    createEvent: (state, { payload }) => {
      state.events.push({ ...payload, id: uuidv4() });
      localStorage.setItem('events', JSON.stringify(state.events));
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

export const selectCompletedEventsCount = state => {
  const now = new Date();
  return state.eventList.events.filter(e => {
    const eventDateTime = new Date(`${e.date}T${e.time}`);

    const notifyBeforeTime =
      (e.notifyBeforeDays || 0) * 24 * 60 * 60 * 1000 +
      (e.notifyBeforeHours || 0) * 60 * 60 * 1000 +
      (e.notifyBeforeMinutes || 0) * 60 * 1000;

    const notifyAt = new Date(eventDateTime.getTime() - notifyBeforeTime);

    return notifyAt <= now && e.isMessageVisible !== false;
  }).length;
};

export default reducer;
