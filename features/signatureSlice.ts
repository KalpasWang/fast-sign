import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FileType = string | null;
// signature state type
export interface SignatureState {
  rawFile: FileType;
  draggedImage?: HTMLImageElement;
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
    saveSignatureImage: (state, action: PayloadAction<HTMLImageElement>) => {
      return { ...state, draggedImage: action.payload };
    },
  },
});

export const { saveUploadedFile, saveSignatureImage } = signatureSlice.actions;
export const selectRawFile = (state: RootState) => state.signature.rawFile;
export const selectDraggedImage = (state: RootState) =>
  state.signature.draggedImage;

export default signatureSlice.reducer;
