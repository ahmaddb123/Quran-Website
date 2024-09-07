import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
export const fetchJuz =   createAsyncThunk("quran/fetchJuz" , async ()=> {
    const res =  await fetch("https://api.quran.com/api/v4/juzs");
    const data = await res.json();
    return data;
})

const juzSlice = createSlice({
    initialState: [],
    name: "juzSlice",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchJuz.fulfilled, (state , action) => {
            return action.payload
        })
    }
})

export default juzSlice.reducer