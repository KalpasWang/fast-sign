import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

// signature state type
export interface SignatureState {
  rawFile: File | null;
}

const initialState: SignatureState = {
  rawFile: null,
};

export const signatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {},
});

// export const { goNextStep, goPreviousStep, reset } = progressSlice.actions;

export const selectRawFile = (state: RootState) => state.signature.rawFile;

export default signatureSlice.reducer;
