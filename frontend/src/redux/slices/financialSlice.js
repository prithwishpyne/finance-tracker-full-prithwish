import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

const initialState = {
  assets: 0,
  liabilities: 0,
  netWorth: 0,
  status: "idle",
  error: null,
};

export const fetchAssetsLiabilities = createAsyncThunk(
  "financial/fetchData",
  async () => {
    const response = await axiosInstance.get("/assets-liabilities/");
    return response.data;
  }
);

const financialSlice = createSlice({
  name: "financial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetsLiabilities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAssetsLiabilities.fulfilled, (state, action) => {
        const totalAssets = action.payload
          .filter((item) => item.type === "Asset")
          .reduce((sum, item) => sum + item.amount, 0);

        const totalLiabilities = action.payload
          .filter((item) => item.type === "Liability")
          .reduce((sum, item) => sum + item.amount, 0);

        state.status = "succeeded";
        state.assets = totalAssets;
        state.liabilities = totalLiabilities;
        state.netWorth = totalAssets - totalLiabilities;
      })
      .addCase(fetchAssetsLiabilities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default financialSlice.reducer;
