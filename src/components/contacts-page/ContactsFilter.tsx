import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from 'components/form/FormInput';
import FormSelect from 'components/form/FormSelect';
import Button from 'components/ui/Button';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { resetContactsFilter, setContactsFilter } from 'store/contacts/slice';
import { fetchContacts } from 'store/contacts/actions';

interface FilterData {
  fullname: string;
  phone: string;
  email: string;
  label_id: number;
}

const ContactsFilter: FC = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<FilterData>();

  const { labels } = useAppSelector((state) => state.labels);

  useEffect(() => {
    return () => {
      dispatch(resetContactsFilter());
    };
  }, [dispatch]);

  const handleFilterContacts: SubmitHandler<FilterData> = (data) => {
    dispatch(
      setContactsFilter({
        ...data,
        label_id: data.label_id && Number(data.label_id),
      }),
    );
    dispatch(fetchContacts());
  };

  return (
    <form
      onSubmit={handleSubmit(handleFilterContacts)}
      className="mt-[16px] flex items-end gap-[10px] border border-primary-light bg-white p-4 rounded-md">
      <FormInput
        label="ФИО контакта"
        control={control}
        name="fullname"
        classes={{ root: 'w-full' }}
      />
      <FormInput label="Email" control={control} name="email" classes={{ root: 'w-full' }} />
      <FormInput
        label="Номер телефона"
        control={control}
        name="phone"
        placeholder="+998"
        classes={{ root: 'w-full' }}
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
  );
};

export default ContactsFilter;
