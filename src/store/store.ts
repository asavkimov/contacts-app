import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { authReducer } from 'store/auth/slice';
import { labelsReducer } from 'store/labels/slice';
import { contactsReducer } from 'store/contacts/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    labels: labelsReducer,
    contacts: contactsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
