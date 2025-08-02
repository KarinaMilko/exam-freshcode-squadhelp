import { createSlice } from '@reduxjs/toolkit';

const CONTEST_SAVING_SLICE_NAME = 'contestCreation';

const initialState = {
  contests: {},
};

const reducers = {
  saveContestToStore: (state, { payload: { type, info } }) => {
    const { file, ...infoWithoutFile } = info;
    state.contests = {
      ...state.contests,
      ...{ [type]: infoWithoutFile },
    };
  },
  clearContestStore: () => initialState,
};

const contestSavingSlice = createSlice({
  name: CONTEST_SAVING_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = contestSavingSlice;

export const { saveContestToStore, clearContestStore } = actions;

export default reducer;
