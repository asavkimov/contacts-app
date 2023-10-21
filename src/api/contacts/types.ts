import { Contact } from 'domain/entities/contact';

export type GetContactsResponse = Contact[];

export type GetContactResponse = Contact;

export interface CreateContactData {
  fullname: string;
  phone: string;
  email: string;
  label_id: number;
}

export interface UpdateContactData extends CreateContactData {}

export interface GetContactsParams {
  fullname?: string;
  phone?: string;
  email?: string;
  label_id?: number;
}
