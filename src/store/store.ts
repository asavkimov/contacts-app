import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { authReducer } from './auth/slice';
import { labelsReducer } from './labels/slice';
import { contactsReducer } from './contacts/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    labels: labelsReducer,
    contacts: contactsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
