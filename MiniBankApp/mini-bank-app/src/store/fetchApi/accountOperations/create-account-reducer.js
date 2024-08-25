import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    response: [],
    err: null,
}

export const createAccount = createAsyncThunk("accounts/create", async (axiosCall) => {

    const response = await axiosCall.axios.post(axiosCall.url,
        JSON.stringify({
            "username": axiosCall.accountCreateDTO.username,
            "accountName": axiosCall.accountCreateDTO.accountName
        }),
        {
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "same-origin"
        });
    return response.data;
})

const createAccountSlice = createSlice({
    name: 'createAccount',
    initialState,
    extraReducers: builder => {
        builder.addCase(createAccount.pending, state => {
            state.loading = true
        })
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.err = ''
        })
        builder.addCase(createAccount.rejected, (state, action) => {
            state.loading = false
            state.response = false
            state.err = action.err.message
        })
    }
})
export default createAccountSlice.reducer;
