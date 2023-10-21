import { Contact } from 'domain/entities/contact';
import { GetContactsParams } from 'api/contacts/types';

export interface ContactsState {
  contacts: Contact[];
  contactsLoading: boolean;

  contactsFilter?: GetContactsParams;

  currentContact: Contact | null;
  currentContactLoading: boolean;
}
