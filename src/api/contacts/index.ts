import { db } from 'config/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { GetContactsResponse } from './types';
import { Contact } from '../../domain/entities/contact';

class ContactsService {
  async getContacts(): Promise<GetContactsResponse> {
    const q = query(collection(db, 'contacts'));
    const response = await getDocs(q);

    return response.docs.map((label) => label.data() as Contact);
  }
}

export default new ContactsService();
