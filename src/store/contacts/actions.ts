import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import api from 'api';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, ThunkApi) => {
  const { user } = (ThunkApi.getState() as RootState).auth;

  if (!user?.uid) {
    return [];
  }

  return await api.contacts.getContacts(user.uid);
});
