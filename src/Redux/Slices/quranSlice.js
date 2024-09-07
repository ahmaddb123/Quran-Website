import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSurahs = createAsyncThunk("quran/fetchSurahs", async () => {
  const res = await fetch("https://api.quran.com/api/v4/chapters");
  const data = await res.json();
  return data;
});

const quranSlice = createSlice({
  initialState: [],
  name: "quranSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSurahs.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export default quranSlice.reducer;
