import { RootState } from '@/store/store';
import { toBase64 } from '@/utils/base64';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PDFDocument, degrees } from 'pdf-lib';

export type FileType = string | null;
export type Signature = {
  id: string;
  file: string;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

// signature state type
export interface SignatureState {
  pending: boolean;
  rawFile: FileType;
  signedFile: FileType;
  signatures: Signature[];
  error: string | null;
}

export const initialState: SignatureState = {
  pending: false,
  rawFile: null,
  signedFile: null,
  signatures: [],
  error: null,
};

// async thunk: add signature to pdf
export const addSignatureToPdf = createAsyncThunk<
  string,
  void,
  { state: RootState; rejectValue: string }
>('signature/addSignatureToPdf', async (_, thunkApi) => {
  const { rawFile, signatures } = thunkApi.getState().signature;
  if (!rawFile) return thunkApi.rejectWithValue('錯誤：沒有 rawFile');

  const pdfDoc = await PDFDocument.load(rawFile);

  signatures.forEach(async (signature) => {
    const image = await pdfDoc.embedPng(signature.file);
    const page = pdfDoc.getPage(signature.pageNumber - 1);
    const { x, y, width, height, rotation } = signature;
    page.drawImage(image, {
      x,
      y: page.getHeight() - y - height,
      width,
      height,
      rotate: degrees(rotation),
    });
  });
  const pdfBytes = await pdfDoc.save();
  return toBase64(pdfBytes);
});

export const signatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    saveUploadedFile: (state, action: PayloadAction<FileType>) => {
      return { ...state, rawFile: action.payload };
    },
    saveSignedFile: (state, action: PayloadAction<FileType>) => {
      if (!state.rawFile) return;
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
  extraReducers: (builder) => {
    builder.addCase(addSignatureToPdf.pending, (state) => {
      state.pending = true;
      state.signedFile = null;
    });
    builder.addCase(addSignatureToPdf.fulfilled, (state, action) => {
      state.pending = false;
      state.signedFile = action.payload;
      state.error = null;
    });
    builder.addCase(addSignatureToPdf.rejected, (state, action) => {
      state.pending = false;
      if (action.error.message) {
        state.error = action.error.message;
      } else {
        state.error = '發生錯誤';
      }
    });
  },
});

export const { saveUploadedFile, saveSignedFile, updateSignatureArray } =
  signatureSlice.actions;
export const selectPending = (state: RootState) => state.signature.pending;
export const selectRawFile = (state: RootState) => state.signature.rawFile;
export const selectSignedFile = (state: RootState) =>
  state.signature.signedFile;
export const selectSignatures = (state: RootState) =>
  state.signature.signatures;
export const selectError = (state: RootState) => state.signature.error;

export default signatureSlice.reducer;
