import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { provinceApi } from 'src/api/province';

const initialState = {
    pending: false,
    success: false,
    failed: false,
    message: '',
    data: []
};

export const getProvinces = createAsyncThunk('get list province', async () => {
    const res = await provinceApi.getProvinces();
    return {
        provinces: res.data.map((value) => ({ name: value.name, code: value.code })),
        districts: res.data.map((value) => {
            return value.districts.map((district) => ({
                name: district.name,
                code: district.code
            }));
        }),
        wards: res.data.map((value) => {
            return value.districts.map((district) => {
                return district.wards.map((ward) => ({ name: ward.name, code: ward.code }));
            });
        })
    };
});

const provinces = createSlice({
    name: 'province',
    initialState,
    extraReducers: {
        [getProvinces.pending]: (state) => {
            state.pending = true;
            state.success = false;
            state.failed = false;
        },
        [getProvinces.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.data = action.payload;
        },
        [getProvinces.rejected]: (state, action) => {
            state.pending = false;
            state.failed = true;
            state.message = action.error.message;
        }
    }
});
export default provinces.reducer;
