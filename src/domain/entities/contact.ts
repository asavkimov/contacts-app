import { Label } from './label';

export interface Contact {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  label_id: Label['id'];
  phone: string;
}
