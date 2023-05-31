import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FileType = string | null;
type Signature = {
  id: string;
  file: string;
  pageNumber: number;
  x: number;
  y: number;
};

// signature state type
export interface SignatureState {
  rawFile: FileType;
  signedFile: FileType;
  signature: Signature[];
}

const initialState: SignatureState = {
  rawFile: null,
  signedFile: null,
  signature: [],
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
    addSignature: (state, action: PayloadAction<Signature>) => {
      state.signature.push(action.payload);
      return { ...state };
    },
  },
});

export const { saveUploadedFile, saveSignedFile, addSignature } =
  signatureSlice.actions;
export const selectRawFile = (state: RootState) => state.signature.rawFile;
export const selectSignedFile = (state: RootState) =>
  state.signature.signedFile;
export const selectSignature = (state: RootState) => state.signature.signature;

export default signatureSlice.reducer;
