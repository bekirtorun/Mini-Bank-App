import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    response: [],
    err: null,
}

export const deleteAccount = createAsyncThunk("accounts/delete", async (axiosCall) => {

    const response = await axiosCall.axios.delete(axiosCall.url,
        JSON.stringify({
            "username": localStorage.getItem('username'),
            "accountName": axiosCall.accountName
        }),
        {
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "same-origin"
        });
    return response.data;
})

const deleteAccountSlice = createSlice({
    name: 'deleteAccount',
    initialState,
    extraReducers: builder => {
        builder.addCase(deleteAccount.pending, state => {
            state.loading = true
        })
        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.err = ''
        })
        builder.addCase(deleteAccount.rejected, (state, action) => {
            state.loading = false
            state.response = false
            state.err = action.err.message
        })
    }
})
export default deleteAccountSlice.reducer;
