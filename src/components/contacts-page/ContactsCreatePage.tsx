import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import api from 'api';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchLabels } from 'store/labels/actions';

import Button from 'components/ui/Button';
import FormInput from 'components/form/FormInput';
import FormSelect from 'components/form/FormSelect';
import { Messages } from 'components/form/messages';

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

const ContactsCreatePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<SubmitData>({
    resolver: yupResolver(validationSchema),
  });

  const { user } = useAppSelector((state) => state.auth);
  const { labels } = useAppSelector((state) => state.labels);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchLabels());
  }, []);

  if (!user) {
    return null;
  }

  const handleCreateContact: SubmitHandler<SubmitData> = async (data) => {
    try {
      setLoading(true);

      const contactData = {
        ...data,
        label_id: Number(data.label_id),
      };

      await api.contacts.createContact(user.uid, contactData);
      navigate('/contacts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium">Создать контакт</h3>
      <form onSubmit={handleSubmit(handleCreateContact)}>
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
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactsCreatePage;
