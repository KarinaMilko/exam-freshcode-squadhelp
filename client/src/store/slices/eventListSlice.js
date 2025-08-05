import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { countCompletedEvents } from '../../utils/functions';

const getUserEventsKey = userId => `events_${userId}`;

const saveEventsToLocalStorage = (userId, events) => {
  if (userId) {
    localStorage.setItem(getUserEventsKey(userId), JSON.stringify(events));
  }
};

const initialState = {
  events: [],
  completedEventsCount: 0,
  userId: null,
};

const eventListSlice = createSlice({
  initialState,
  name: 'events',
  reducers: {
    removeEvent: (state, { payload }) => {
      const foundEventIndex = state.events.findIndex(e => e.id === payload);
      if (foundEventIndex !== -1) {
        state.events.splice(foundEventIndex, 1);
        saveEventsToLocalStorage(state.userId, state.events);
      }
    },
    createEvent: (state, { payload }) => {
      state.events.push({ ...payload, id: uuidv4() });
      saveEventsToLocalStorage(state.userId, state.events);
    },
    hideMessage: (state, { payload }) => {
      const event = state.events.find(e => e.id === payload);
      if (event) {
        event.isMessageVisible = false;
        saveEventsToLocalStorage(state.userId, state.events);
      }
    },
    updateCompletedEventsCount: (state, { payload }) => {
      state.completedEventsCount = payload;
    },
    setUserId: (state, { payload }) => {
      state.userId = payload;
      state.events = [];
      state.completedEventsCount = 0;
    },
    setEvents: (state, { payload }) => {
      state.events = payload;
      state.completedEventsCount = countCompletedEvents(payload);
    },
    clearEventsStore: state => {
      state.userId = null;
      state.events = [];
      state.completedEventsCount = 0;
    },
  },
});

const { reducer, actions } = eventListSlice;

export const {
  removeEvent,
  createEvent,
  hideMessage,
  updateCompletedEventsCount,
  setUserId,
  setEvents,
  clearEventsStore,
} = actions;

export const selectCompletedEventsCount = state =>
  countCompletedEvents(state.eventList.events);

export default reducer;
