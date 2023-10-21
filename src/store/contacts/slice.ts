import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetContactsResponse } from 'api/contacts/types';
import { ContactsState } from './types';
import { fetchContacts } from './actions';

const initialState: ContactsState = {
  contacts: [],
  contactsLoading: true,
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
  },
});

export const contactsReducer = contactsSlice.reducer;
