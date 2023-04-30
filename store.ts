import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './features/progressSlice';

export const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});

export type AppDispatcher = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
