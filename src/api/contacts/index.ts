import { db } from 'config/firebase';
import { collection, query, getDocs, doc, setDoc } from 'firebase/firestore';
import { CreateContactData, GetContactsResponse } from './types';
import { Contact } from 'domain/entities/contact';

class ContactsService {
  async getContacts(userUID: string): Promise<GetContactsResponse> {
    const q = query(collection(db, `users/${userUID}/contacts`));
    const response = await getDocs(q);

    return response.docs.map((label) => label.data() as Contact);
  }

  async createContact(userUID: string, data: CreateContactData) {
    const newContact = doc(collection(db, `users/${userUID}/contacts`));

    return await setDoc(newContact, data);
  }
}

export default new ContactsService();
