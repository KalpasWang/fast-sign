import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FileType = Uint8Array | null;
// signature state type
export interface SignatureState {
  rawFile: FileType;
}

const initialState: SignatureState = {
  rawFile: null,
};

export const signatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    saveUploadedFile: (state, action: PayloadAction<FileType>) => {
      return { ...state, rawFile: action.payload };
    },
  },
});

export const { saveUploadedFile } = signatureSlice.actions;

export const selectRawFile = (state: RootState) => state.signature.rawFile;

export default signatureSlice.reducer;
