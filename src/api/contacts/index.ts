import { db } from 'config/firebase';
import {
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  where,
} from 'firebase/firestore';
import {
  CreateContactData,
  GetContactResponse,
  GetContactsParams,
  GetContactsResponse,
  UpdateContactData,
} from './types';
import { Contact } from 'domain/entities/contact';

class ContactsService {
  private contactsCollection: string = '';

  private refresh() {
    const uid = localStorage.getItem('uid') as string;

    this.contactsCollection = `users/${uid}/contacts`;
  }

  async getContacts(params?: GetContactsParams): Promise<GetContactsResponse> {
    this.refresh();

    console.log(params);

    const contactsRef = collection(db, this.contactsCollection);
    let q = query(contactsRef);

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key as keyof typeof params];

        if (value) {
          q = query(contactsRef, where(key, '==', value));
        }
      });
    }

    const response = await getDocs(q);

    return response.docs.map(
      (label) =>
        ({
          uid: label.id,
          ...label.data(),
        }) as Contact,
    );
  }

  async getContact(contactUID: string): Promise<GetContactResponse> {
    this.refresh();

    const contactRef = doc(db, this.contactsCollection, contactUID);
    const res = await getDoc(contactRef);

    const contactData: Contact = {
      ...(res.data() as Contact),
      uid: res.id,
    };

    return contactData;
  }

  async createContact(data: CreateContactData) {
    this.refresh();

    const newContact = doc(collection(db, this.contactsCollection));
    await setDoc(newContact, data);
  }

  async updateContact(contactUID: string, data: UpdateContactData) {
    this.refresh();

    const contactRef = doc(collection(db, this.contactsCollection), contactUID);
    await setDoc(contactRef, data);
  }

  async deleteContact(contactUID: string) {
    this.refresh();

    await deleteDoc(doc(db, this.contactsCollection, contactUID));
  }
}

export default new ContactsService();
