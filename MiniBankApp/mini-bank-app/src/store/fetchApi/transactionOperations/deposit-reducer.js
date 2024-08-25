import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    response: [],
    err: null,
}

export const deposit = createAsyncThunk("transactions/deposit", async (axiosCall) => {

    const response = await axiosCall.axios.put(axiosCall.url,
        JSON.stringify({
            "userId": localStorage.getItem('userId'),
            "accountId": localStorage.getItem('depositAccountId'),
            "depositAmount": axiosCall.depositAmount
        }),
        {
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "same-origin"
        });
    return response.data;
})

const depositSlice = createSlice({
    name: 'deposit',
    initialState,
    extraReducers: builder => {
        builder.addCase(deposit.pending, state => {
            state.loading = true
        })
        builder.addCase(deposit.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.err = ''
        })
        builder.addCase(deposit.rejected, (state, action) => {
            state.loading = false
            state.response = false
            state.err = action.err.message
        })
    }
})
export default depositSlice.reducer;
