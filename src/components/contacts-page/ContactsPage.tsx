import { FC, useCallback, useEffect } from 'react';
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
import parsePhoneNumberFromString from 'libphonenumber-js';
import { getLabelColor } from 'domain/services/label';
import api from 'api';

interface FilterData {
  fullname: string;
  phone: string;
  email: string;
  label_id: number;
}

const ContactsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<FilterData>();

  const { labels } = useAppSelector((state) => state.labels);
  const { contacts, contactsLoading } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchLabels());
    dispatch(fetchContacts());
  }, []);

  const handleFilterContacts: SubmitHandler<FilterData> = (data) => {
    console.log(data);
  };

  const handleDeleteContact = async (contact: Contact) => {
    await api.contacts.deleteContact(contact.uid);
    dispatch(fetchContacts());
  };

  const renderContactCard = useCallback(
    (contact: Contact, index: number) => {
      const label = labels.find((l) => l.id === contact.label_id)!;
      const labelColors = getLabelColor(label);
      const parsedPhone = parsePhoneNumberFromString(contact.phone);

      return (
        <div
          className="min-h-[100px] flex-[0_1_32.5%] border border-primary-light shadow-md rounded-md p-[12px]"
          key={contact.uid}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold mt-[4px]">
              <i>{contact.fullname}</i>
            </h3>
            {label && (
              <div
                className={cn(
                  `text-xs py-1 px-2.5 bg-${labelColors.bg} text-${labelColors.text} w-min rounded-full`,
                )}>
                {label.title}
              </div>
            )}
          </div>
          <a href={`tel:${contact.phone}`} className="mt-[4px] max-w-max block hover:underline">
            {parsedPhone?.isValid() ? parsedPhone?.formatInternational() : contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="max-w-max block hover:underline">
            {contact.email}
          </a>
          <div className="flex justify-end gap-[8px]">
            <Button
              to={`/contacts/${contact.uid}/edit`}
              className="flex justify-center items-center !py-1 btn-outline-secondary text-xs">
              Редакт.
            </Button>
            <Button
              className="flex justify-center items-center btn-outline-danger text-xs"
              onClick={() => handleDeleteContact(contact)}>
              Удалить
            </Button>
          </div>
        </div>
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
      <form
        onSubmit={handleSubmit(handleFilterContacts)}
        className="mt-[16px] flex items-end gap-[10px] border border-primary-light bg-white p-4 rounded-md">
        <FormInput
          label="Имя контакта"
          control={control}
          name="fullname"
          classes={{ root: 'w-full' }}
        />
        <FormInput label="Email" control={control} name="email" classes={{ root: 'w-full' }} />
        <FormInput
          label="Номер телефона"
          control={control}
          name="phone"
          placeholder="998"
          classes={{ root: 'w-full' }}
          defaultValue="998"
        />
        <FormSelect
          label="Теги"
          control={control}
          name="label_id"
          options={labels.map((label) => ({
            label: label.title,
            value: label.id,
          }))}
          classes={{ root: 'w-full' }}
        />
        <Button type="submit" className="h-[39px] btn-primary">
          Поиск
        </Button>
      </form>
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
