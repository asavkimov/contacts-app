import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';
import { RootState } from 'store/store';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, ThunkApi) => {
  const { contactsFilter } = (ThunkApi.getState() as RootState).contacts;

  return await api.contacts.getContacts(contactsFilter);
});

export const fetchContact = createAsyncThunk(
  'contacts/fetchContact',
  async (contactUID: string, ThunkApi) => {
    return await api.contacts.getContact(contactUID);
  },
);
