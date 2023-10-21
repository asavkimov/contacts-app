import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetContactResponse, GetContactsResponse } from 'api/contacts/types';
import { ContactsState } from './types';
import { fetchContact, fetchContacts } from './actions';

const initialState: ContactsState = {
  contacts: [],
  contactsLoading: true,
  currentContact: null,
  currentContactLoading: true,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.contactsLoading = true;
    });
    builder.addCase(
      fetchContacts.fulfilled,
      (state, action: PayloadAction<GetContactsResponse>) => {
        state.contacts = action.payload;
        state.contactsLoading = false;
      },
    );
    builder.addCase(fetchContact.pending, (state) => {
      state.currentContact = null;
      state.currentContactLoading = true;
    });
    builder.addCase(fetchContact.fulfilled, (state, action: PayloadAction<GetContactResponse>) => {
      state.currentContact = action.payload;
      state.currentContactLoading = false;
    });
  },
});

export const contactsReducer = contactsSlice.reducer;
