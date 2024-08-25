import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    response: [],
    err: null,
}

export const viewAccount = createAsyncThunk("accounts/view", async (axiosCall) => {

    const response = await axiosCall.axios.get(axiosCall.url,
        {
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "same-origin"
        });
    return response.data;
})

const viewAccountSlice = createSlice({
    name: 'viewAccount',
    initialState,
    extraReducers: builder => {
        builder.addCase(viewAccount.pending, state => {
            state.loading = true
        })
        builder.addCase(viewAccount.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.err = ''
        })
        builder.addCase(viewAccount.rejected, (state, action) => {
            state.loading = false
            state.response = false
            state.err = action.err.message
        })
    }
})
export default viewAccountSlice.reducer;
