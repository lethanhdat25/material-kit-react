import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from 'src/api/user';
const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: []
};

export const getUser = createAsyncThunk('get user', async (params) => {
    const res = await userApi.getUser(params.type, params.value);
    return res.data;
});

export const editUser = createAsyncThunk('Edit User', async (params) => {
    const res = await userApi.editUser(params);
    return res.data;
});


const carts = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getUser.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getUser.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getUser.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        }
    }
});
export default carts.reducer;
