import { configureStore } from '@reduxjs/toolkit';
import progressReducer from '../features/progressSlice';
import signatureReducer from '../features/signatureSlice';

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    signature: signatureReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
