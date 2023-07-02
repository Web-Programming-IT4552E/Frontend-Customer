import { CategoryData } from "@/@types/category";
import { ReduxDataStatus } from "@/interfaces/redux.interface";
import { request } from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CategoryInterface {
  data: [CategoryData?],
  status: ReduxDataStatus
}

const initialState: CategoryInterface = {
  data: [],
  status: ReduxDataStatus.IDLE
}

export const fetchCategories = createAsyncThunk("category/categories", async () => {
  const response = await request(
    {
      
      url: `/category/categories`,
    },
    false
  );
  return response.data;
});


export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.rejected, (state, _) => {
      state.status = ReduxDataStatus.REJECTED;
    })
    builder.addCase(fetchCategories.pending, (state, _) => {
      state.status = ReduxDataStatus.PENDING;
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = ReduxDataStatus.IDLE;
      state.data = action.payload;
    })
  }
})

export default categorySlice.reducer;