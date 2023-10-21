import { db } from 'config/firebase';
import { collection, query, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { CreateContactData, GetContactsResponse } from './types';
import { Contact } from 'domain/entities/contact';

class ContactsService {
  private contactsCollection: string = '';

  private refresh() {
    const uid = localStorage.getItem('uid') as string;

    this.contactsCollection = `users/${uid}/contacts`;
  }

  async getContacts(): Promise<GetContactsResponse> {
    this.refresh();

    const q = query(collection(db, this.contactsCollection));
    const response = await getDocs(q);

    return response.docs.map(
      (label) =>
        ({
          uid: label.id,
          ...label.data(),
        }) as Contact,
    );
  }

  async createContact(data: CreateContactData) {
    this.refresh();

    const newContact = doc(collection(db, this.contactsCollection));

    return await setDoc(newContact, data);
  }

  async deleteContact(contactUID: string) {
    this.refresh();

    await deleteDoc(doc(db, this.contactsCollection, contactUID));
  }
}

export default new ContactsService();
