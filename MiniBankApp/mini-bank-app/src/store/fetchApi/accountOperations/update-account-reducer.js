import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    response: [],
    err: null,
}

export const updateAccount = createAsyncThunk("accounts/update", async (axiosCall) => {

    const response = await axiosCall.axios.put(axiosCall.url,
        JSON.stringify({
            "balance": axiosCall.accountUpdateDTO.balance
        }),
        {
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "same-origin"
        });
    return response.data;
})

const updateAccountSlice = createSlice({
    name: 'updateAccount',
    initialState,
    extraReducers: builder => {
        builder.addCase(updateAccount.pending, state => {
            state.loading = true
        })
        builder.addCase(updateAccount.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.err = ''
        })
        builder.addCase(updateAccount.rejected, (state, action) => {
            state.loading = false
            state.response = false
            state.err = action.err.message
        })
    }
})
export default updateAccountSlice.reducer;
