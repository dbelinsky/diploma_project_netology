import { IPostStatus } from '../models/interfaces';
import { Order } from '../models/index';
import { apiService } from '../API/apiService';
import { RootState } from '.';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const postOrderThunk = createAsyncThunk('slicePostOrder/postOrderThunk', async (order: Order) => {
  const response = await apiService.postOrder(order);
  return response.data;
});

const initialState: IPostStatus = {
  status: false,
  loading: false,
  error: false
};

export const slicePostOrder = createSlice({
  name: 'slicePostOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(postOrderThunk.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(postOrderThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const slicePostOrderState = (state: RootState) => state.slicePostOrder;
export default slicePostOrder.reducer;