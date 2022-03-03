import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartApi } from 'src/api/cart';
const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: []
};

export const getCarts = createAsyncThunk('get list carts', async () => {
    const res = await cartApi.getCart();
    return res.data;
});

export const postCart = createAsyncThunk('post cart', async (params) => {
    const res = await cartApi.postCart(params);
    return res.data;
});

const carts = createSlice({
    name: 'carts',
    initialState,
    extraReducers: {
        [getCarts.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getCarts.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getCarts.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        }
    }
});
export default carts.reducer;
