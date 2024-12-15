import { IGetStatus, IRoute, ISearchRoute } from "../models/interfaces";
import { apiService } from "../API/apiService";
import { RootState } from ".";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRouteThunk = createAsyncThunk('sliceGetCity/getRouteThunk', async (route: ISearchRoute) => {
  const response = await apiService.getRoutes(route);
  return response.data;
});

const initialState: IGetStatus<IRoute | null> = {
  items: null,
  loading: false,
  error: false
};

export const sliceGetRoute = createSlice({
  name: 'sliceGetRoute',
  initialState,
  reducers: {
    clearRouteList: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRouteThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getRouteThunk.fulfilled, (state, action: PayloadAction<IRoute>)  => {
        state.loading = false;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(getRouteThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export const {
  clearRouteList
} = sliceGetRoute.actions;

export const sliceGetRouteState = (state: RootState) => state.sliceGetRoute
export default sliceGetRoute.reducer;
