import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// دالة لجلب البيانات
export const fetchRiwayat = createAsyncThunk("quran/fetchriwayat", async () => {
  const res = await fetch(
    "https://www.mp3quran.net/api/v3/riwayat?language=ar"
  );
  const data = await res.json();
  return data; // افترض أن البيانات هي مصفوفة مباشرة
});

const riwayatSlice = createSlice({
  name: "riwayatSlice",
  initialState: {
    riwayat: [], // حالة افتراضية للبيانات
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiwayat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRiwayat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.riwayat = action.payload;
      })
      .addCase(fetchRiwayat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default riwayatSlice.reducer;
