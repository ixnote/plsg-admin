import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MDASState {
  step: number;
}

const initialState: MDASState = {
  step: 1,
};

export const mdasSlice = createSlice({
  name: 'mdas',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    nextStep: (state, action: PayloadAction<any>) => {},
    // Use the PayloadAction type to declare the contents of `action.payload`
    setValues: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStep, nextStep, setValues } = mdasSlice.actions;
export default mdasSlice.reducer;
