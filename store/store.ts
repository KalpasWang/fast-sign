import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import progressReducer from '../features/progressSlice';
import signatureReducer from '../features/signatureSlice';

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    signature: signatureReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const setupTestStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      progress: progressReducer,
      signature: signatureReducer,
    },
    preloadedState,
  });
};
