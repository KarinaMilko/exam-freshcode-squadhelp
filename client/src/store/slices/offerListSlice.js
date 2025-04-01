import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CONSTANS from '../../constants';
import * as restController from './../../api/rest/restController';

const {
  SLICE_NAME: { OFFERS_SLICE_NAME },
} = CONSTANS;

const initialState = {
  offers: [],
  isFetching: false,
  error: null,
  filter: '',
};

export const getOffersThunk = createAsyncThunk(
  `${OFFERS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const { data } = await restController.getOffers(payload);
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

const offerListSlice = createSlice({
  initialState,
  name: OFFERS_SLICE_NAME,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getOffersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getOffersThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.offers = [...payload];
    });
    builder.addCase(getOffersThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = offerListSlice;

export const { setFilter } = actions;

export default reducer;
