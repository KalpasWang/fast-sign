import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FileType = string | null;
// signature state type
export interface SignatureState {
  rawFile: FileType;
  signedFile: FileType;
}

const initialState: SignatureState = {
  rawFile: null,
  signedFile: null,
};

export const signatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    saveUploadedFile: (state, action: PayloadAction<FileType>) => {
      return { ...state, rawFile: action.payload };
    },
    saveSignedFile: (state, action: PayloadAction<FileType>) => {
      return { ...state, signedFile: action.payload };
    },
  },
});

export const { saveUploadedFile, saveSignedFile } = signatureSlice.actions;
export const selectRawFile = (state: RootState) => state.signature.rawFile;
export const selectSignedFile = (state: RootState) =>
  state.signature.signedFile;

export default signatureSlice.reducer;
