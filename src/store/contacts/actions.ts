import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, ThunkApi) => {
  return await api.contacts.getContacts();
});
