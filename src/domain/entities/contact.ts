import { Label } from './label';

export interface Contact {
  email: string;
  fullname: string;
  label_id: Label['id'];
  phone: string;
}
