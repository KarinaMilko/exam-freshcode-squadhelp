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
  page: 1,
  totalPages: 1,
};

export const getOffersThunk = createAsyncThunk(
  `${OFFERS_SLICE_NAME}/get`,
  async ({ status, page }, { rejectWithValue }) => {
    try {
      const { data } = await restController.getOffers({ status, page });
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

export const updateOffersStatusThunk = createAsyncThunk(
  `${OFFERS_SLICE_NAME}/updateStatus`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.updateOffersStatus(payload);
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

export const getApprovedOffersThunk = createAsyncThunk(
  `${OFFERS_SLICE_NAME}/getApproved`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.getApprovedOffersForCustomer(
        payload
      );
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
      state.page = 1;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getOffersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getOffersThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.offers = payload.offers;
      state.totalPages = payload.totalPages;
    });
    builder.addCase(getOffersThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    builder.addCase(updateOffersStatusThunk.fulfilled, (state, { payload }) => {
      if (state.filter === CONSTANS.OFFER_STATUS_PENDING) {
        state.filter = state.offers.filter(o => o.id !== payload.id);
      } else {
        state.offers = state.offers.map(o =>
          o.id === payload.id ? { ...o, status: payload.status } : o
        );
      }
    });

    builder.addCase(getApprovedOffersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getApprovedOffersThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.offers = payload;
      state.totalPages = 1;
    });
    builder.addCase(getApprovedOffersThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});
const { reducer, actions } = offerListSlice;

export const { setFilter, setPage } = actions;

export default reducer;
