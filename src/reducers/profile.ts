import { Customer } from '@/@types/customer';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ReduxDataStatus } from '../interfaces/redux.interface';

export interface ProfileDataInterface {
  data?: Customer,
  pre_data?: Customer,
  status: ReduxDataStatus
}

const initialState: ProfileDataInterface = {
  data: undefined,
  status: ReduxDataStatus.PENDING
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Customer>) => {
      state.data = action.payload;
      if (state.pre_data === undefined) {
        state.pre_data = action.payload;
      }
      state.status = ReduxDataStatus.IDLE;
    },
    confirmProfile: (state) => {
      state.pre_data = state.data;
    },
    cancelProfile: (state) => {
      state.data = state.pre_data;
    }
  },
});

export const { updateProfile, confirmProfile, cancelProfile } = profileSlice.actions;
export default profileSlice.reducer;
