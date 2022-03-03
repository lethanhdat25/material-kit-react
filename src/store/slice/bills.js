import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { billApi } from 'src/api/bill';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: []
};

export const getBills = createAsyncThunk('get list bills', async () => {
    const res = await billApi.getBill();
    return res.data;
});
export const postBill = createAsyncThunk('post bills', async (params) => {
    const res = await billApi.postBill(params);
    return res.data;
});

const bills = createSlice({
    name: 'bills',
    initialState,
    extraReducers: {
        [getBills.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getBills.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getBills.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        },
        [postBill.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [postBill.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [postBill.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        }
    }
});
export default bills.reducer;
