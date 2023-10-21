import { Label } from './label';

export interface Contact {
  uid: string;
  email: string;
  fullname: string;
  label_id: Label['id'];
  phone: string;
}
