import { FC, MouseEvent, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';

import { fetchLabels } from 'store/labels/actions';
import { fetchContacts } from 'store/contacts/actions';

import Button from 'components/ui/Button';
import FormInput from 'components/form/FormInput';
import FormSelect from 'components/form/FormSelect';
import { Contact } from 'domain/entities/contact';
import cn from 'classnames';
import Loader from 'components/loader/Loader';
import { getLabelColor } from 'domain/services/label';
import api from 'api';
import { Link } from 'react-router-dom';
import { formatPhoneToInter } from 'domain/phone';
import ContactsFilter from './ContactsFilter';

const ContactsPage: FC = () => {
  const dispatch = useAppDispatch();

  const { labels } = useAppSelector((state) => state.labels);
  const { contacts, contactsLoading } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchLabels());
    dispatch(fetchContacts());
  }, []);

  const handleDeleteContact = async (event: MouseEvent<HTMLButtonElement>, contact: Contact) => {
    event.preventDefault();

    await api.contacts.deleteContact(contact.uid);
    dispatch(fetchContacts());
  };

  const renderContactCard = useCallback(
    (contact: Contact) => {
      const label = labels.find((l) => l.id === contact.label_id)!;
      const labelColors = getLabelColor(label);

      return (
        <Link
          to={`/contacts/${contact.uid}`}
          className="flex-[0_1_32.5%] border border-primary-light shadow-md rounded-md p-[12px] cursor-pointer"
          key={contact.uid}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold mt-[4px]">
              <i>{contact.fullname}</i>
            </h3>
            <div
              className={cn(
                `text-xs py-1 px-2.5 bg-${labelColors.bg} text-${labelColors.text} w-min rounded-full`,
              )}>
              {label.title}
            </div>
          </div>
          <p className="mt-[4px] max-w-max block">{formatPhoneToInter(contact.phone)}</p>
          <div className="flex justify-end gap-[8px] mt-[10px]">
            <Button
              to={`/contacts/${contact.uid}/edit`}
              className="flex justify-center items-center !py-1 btn-outline-secondary text-xs">
              Редакт.
            </Button>
            <Button
              className="flex justify-center items-center btn-outline-danger text-xs"
              onClick={(event) => handleDeleteContact(event, contact)}>
              Удалить
            </Button>
          </div>
        </Link>
      );
    },
    [labels],
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Контакты</h3>
        <Button to="/contacts/create" className="py-1 btn-primary">
          Создать контакт
        </Button>
      </div>
      <ContactsFilter />
      <div className="mt-[16px]">
        {!contactsLoading && !contacts.length && (
          <div className="w-full p-8 flex justify-center items-center border rounded-md">
            <p className="text-sm text-gray-600">Нету кантактов...</p>
          </div>
        )}
        {contactsLoading ? (
          <Loader className="mt-[50px]" />
        ) : (
          <div className="w-full grid grid-cols-3 gap-[14px]">
            {contacts.map(renderContactCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
