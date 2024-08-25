import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    response: [],
    err: null,
}

export const getTransactionHistory = createAsyncThunk("transactions/history", async (axiosCall) => {

    const response = await axiosCall.axios.get(axiosCall.url,
        {
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "same-origin"
        });
    return response.data;
})

const getTransactionHistorySlice = createSlice({
    name: 'getTransactionHistory',
    initialState,
    extraReducers: builder => {
        builder.addCase(getTransactionHistory.pending, state => {
            state.loading = true
        })
        builder.addCase(getTransactionHistory.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.err = ''
        })
        builder.addCase(getTransactionHistory.rejected, (state, action) => {
            state.loading = false
            state.response = false
            state.err = action.err.message
        })
    }
})
export default getTransactionHistorySlice.reducer;
