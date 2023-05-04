import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_STEP = 1;

// progress state type
export interface ProgressState {
  currentStep: number;
}

const initialState: ProgressState = {
  currentStep: DEFAULT_STEP,
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    goNextStep: (state) => {
      state.currentStep += 1;
    },
    goPreviousStep: (state) => {
      state.currentStep -= 1;
    },
    reset: (state) => {
      state.currentStep = DEFAULT_STEP;
    },
  },
});

export const { goNextStep, goPreviousStep, reset } = progressSlice.actions;

export const selectCurrentStep = (state: RootState) =>
  state.progress.currentStep;

export default progressSlice.reducer;
