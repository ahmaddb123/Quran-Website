import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReciters = createAsyncThunk("quran/fetchReciters", async () => {
  const res = await fetch(
    "https://mp3quran.net/api/v3/reciters" 
  );
  const data = await res.json();
  return data; 
});

const recitersSlice = createSlice({
  name: "recitersSlice",
  initialState: {
    riwayat: [], 
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReciters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReciters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.riwayat = action.payload;
      })
      .addCase(fetchReciters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default recitersSlice.reducer;
