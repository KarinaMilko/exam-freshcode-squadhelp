import { createSlice } from '@reduxjs/toolkit';
import CONSTANS from '../../constants';

const { OFFERS_SLICE_NAME } = CONSTANS.SLICE_NAME;

const initialState = {
  offers: [],
  isFetching: false,
  error: null,
};

const offerListSlice = createSlice({
  initialState,
  name: OFFERS_SLICE_NAME,
  reducers: {},
});

const { reducer, actions } = offerListSlice;

export const {} = actions;

export default reducer;
