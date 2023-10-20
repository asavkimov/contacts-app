import { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';
import api from 'api';

const ContactsPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      return;
    }

    api.contacts.getContacts(user.uid).then((res) => console.log(res));
  }, [user]);

  return <div>Hello world</div>;
};

export default ContactsPage;
