import { Contact } from 'domain/entities/contact';

export type GetContactsResponse = Contact[];

export interface CreateContactData {
  fullname: string;
  phone: string;
  email: string;
  label_id: number;
}
