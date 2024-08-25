import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    response: [],
    err: null,
}

export const transferMoney = createAsyncThunk("transactions/transfer", async (axiosCall) => {

    const response = await axiosCall.axios.post(axiosCall.url,
        JSON.stringify({
            "userId": localStorage.getItem('userId'),
            "transferAmount": axiosCall.transferMoneyDTO.transferAmount,
            "fromAccountName": axiosCall.transferMoneyDTO.fromAccountName,
            "toAccountName": axiosCall.transferMoneyDTO.toAccountName
        }),
        {
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "same-origin"
        });
    return response.data;
})

const transferMoneySlice = createSlice({
    name: 'transferMoney',
    initialState,
    extraReducers: builder => {
        builder.addCase(transferMoney.pending, state => {
            state.loading = true
        })
        builder.addCase(transferMoney.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.err = ''
        })
        builder.addCase(transferMoney.rejected, (state, action) => {
            state.loading = false
            state.response = false
            state.err = action.err.message
        })
    }
})
export default transferMoneySlice.reducer;
