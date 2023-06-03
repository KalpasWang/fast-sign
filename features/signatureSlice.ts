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
  signatures: Signature[];
}

const initialState: SignatureState = {
  rawFile: null,
  signedFile: null,
  signatures: [],
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
    updateSignatureArray: (state, action: PayloadAction<Signature>) => {
      const idx = state.signatures.findIndex(
        (signature) => signature.id === action.payload.id
      );
      if (idx >= 0) {
        state.signatures[idx] = action.payload;
        return;
      }
      state.signatures.push(action.payload);
    },
  },
});

export const { saveUploadedFile, saveSignedFile, updateSignatureArray } =
  signatureSlice.actions;
export const selectRawFile = (state: RootState) => state.signature.rawFile;
export const selectSignedFile = (state: RootState) =>
  state.signature.signedFile;
export const selectSignatures = (state: RootState) =>
  state.signature.signatures;

export default signatureSlice.reducer;
