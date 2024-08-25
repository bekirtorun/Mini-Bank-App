import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    response: [],
    err: null,
}

export const searchAccount = createAsyncThunk("accounts/search", async (axiosCall) => {

    const response = await axiosCall.axios.post(axiosCall.url,
        JSON.stringify({
           
            "id":axiosCall.accountSearchDTO.id
        }),
        {
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "same-origin"
        });
    return response.data;
})

const searchAccountSlice = createSlice({
    name: 'searchAccount',
    initialState,
    extraReducers: builder => {
        builder.addCase(searchAccount.pending, state => {
            state.loading = true
        })
        builder.addCase(searchAccount.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.err = ''
        })
        builder.addCase(searchAccount.rejected, (state, action) => {
            state.loading = false
            state.response = false
            state.err = action.err.message
        })
    }
})
export default searchAccountSlice.reducer;
