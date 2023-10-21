import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import api from 'api';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchLabels } from 'store/labels/actions';
import { fetchContact } from 'store/contacts/actions';

import Button from 'components/ui/Button';
import FormInput from 'components/form/FormInput';
import FormSelect from 'components/form/FormSelect';
import { Messages } from 'components/form/messages';
import Loader from 'components/loader/Loader';

interface SubmitData {
  fullname: string;
  phone: string;
  email: string;
  label_id: string;
}

const validationSchema = yup.object({
  fullname: yup.string().required(Messages.REQUIRED_FIELD),
  email: yup.string().email(Messages.NOT_VALID_EMAIL).required(Messages.REQUIRED_FIELD),
  phone: yup.string().length(13, Messages.NOT_VALID_PHONE).required(Messages.REQUIRED_FIELD),
  label_id: yup.string().required(Messages.REQUIRED_FIELD),
});

interface Props {
  edit?: boolean;
}

const ContactsActionPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const { control, handleSubmit, setValue } = useForm<SubmitData>({
    resolver: yupResolver(validationSchema),
  });

  const { labels } = useAppSelector((state) => state.labels);
  const { currentContact, currentContactLoading } = useAppSelector((state) => state.contacts);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  useEffect(() => {
    if (!params.id) {
      return;
    }

    dispatch(fetchContact(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (!props.edit || !currentContact) {
      return;
    }

    setValue('fullname', currentContact.fullname);
    setValue('phone', currentContact.phone);
    setValue('email', currentContact.email);
    setValue('label_id', String(currentContact.label_id));
  }, [currentContact, props.edit, setValue]);

  const handleSubmitForm: SubmitHandler<SubmitData> = async (data) => {
    try {
      setLoading(true);

      const contactData = {
        ...data,
        label_id: Number(data.label_id),
      };

      if (props.edit && currentContact) {
        await api.contacts.updateContact(currentContact.uid, contactData);
      } else {
        await api.contacts.createContact(contactData);
      }

      navigate('/contacts');
    } finally {
      setLoading(false);
    }
  };

  if (props.edit && currentContactLoading) {
    return <Loader className="mt-[30px]" />;
  }

  return (
    <div>
      <h3 className="text-lg font-medium">
        {props.edit ? 'Редактировать контакт' : 'Создать контакт'}
      </h3>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="grid grid-cols-2 gap-[14px] mt-[20px]">
          <FormInput name="fullname" control={control} label="ФИО" />
          <FormInput name="phone" control={control} label="Номер телефона" defaultValue="+998" />
          <FormInput name="email" control={control} label="Email" />
          <FormSelect
            label="Тег"
            control={control}
            name="label_id"
            options={labels.map((label) => ({
              label: label.title,
              value: label.id,
            }))}
            classes={{ root: 'w-full' }}
          />
        </div>
        <div className="flex justify-end">
          <Button className="h-[40px] btn-primary mt-[14px]" disabled={loading}>
            {props.edit ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactsActionPage;
