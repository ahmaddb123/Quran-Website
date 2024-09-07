import { configureStore } from "@reduxjs/toolkit";
import quranSlice from "./Slices/quranSlice";
import juzquran from "./Slices/juzquran";
import riwayatSlice from "./Slices/riwayatSlice";
import recitersSlice from "./Slices/recitersSlice";
export const store = configureStore({
  reducer: {
    quran: quranSlice,
    juz: juzquran,
    riwayat: riwayatSlice,
    reciters : recitersSlice
  },
});
