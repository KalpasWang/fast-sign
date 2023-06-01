import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FileType = string | null;
export type Signature = {
  id: string;
  file: string;
  pageNumber: number;
  // top: number;
  // left: number;
  // width: number;
  // height: number;
  // scaleX: number;
  // scaleY: number;
  rotation: number;
};

// signature state type
export interface SignatureState {
  rawFile: FileType;
  signedFile: FileType;
  signature: Signature[];
}

export interface SelectedSignature {
  signature: Signature;
  index: number;
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
    },
    updateSignature: (state, action: PayloadAction<SelectedSignature>) => {
      state.signature[action.payload.index] = action.payload.signature;
    },
  },
});

export const {
  saveUploadedFile,
  saveSignedFile,
  addSignature,
  updateSignature,
} = signatureSlice.actions;
export const selectRawFile = (state: RootState) => state.signature.rawFile;
export const selectSignedFile = (state: RootState) =>
  state.signature.signedFile;
export const selectSignature = (state: RootState) => state.signature.signature;

export default signatureSlice.reducer;
