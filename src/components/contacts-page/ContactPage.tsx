import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { fetchContact } from 'store/contacts/actions';
import { fetchLabels } from 'store/labels/actions';
import { getLabelColor } from 'domain/services/label';
import { formatPhoneToInter } from 'domain/services/phone';

import Loader from 'components/loader/Loader';

const ContactPage: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  const { currentContact, currentContactLoading } = useAppSelector((state) => state.contacts);
  const { labels, labelsLoading } = useAppSelector((state) => state.labels);

  useEffect(() => {
    if (!params.id) {
      return;
    }

    dispatch(fetchLabels());
    dispatch(fetchContact(params.id));
  }, [dispatch, params.id]);

  if (currentContactLoading || labelsLoading || !currentContact) {
    return <Loader className="mt-[30px]" />;
  }

  const label = labels.find((l) => l.id === currentContact.label_id)!;
  const labelColors = getLabelColor(label);

  return (
    <div>
      <h3 className="text-lg font-medium">Детали контакта</h3>
      <div className="mt-[16px] flex flex-col gap-[12px] border border-primary-light bg-primary-light shadow-md rounded-md p-[18px]">
        <div className="text-md">
          <span className="font-medium">ФИО:</span> {currentContact.fullname}
        </div>
        <div className="text-md">
          <span className="font-medium">Номер телефона:</span>{' '}
          <a href={`tel:${currentContact.phone}`} className="hover:underline">
            {formatPhoneToInter(currentContact.phone)}
          </a>
        </div>
        <div className="text-md">
          <span className="font-medium">Email:</span>{' '}
          <a href={`mailto:${currentContact.email}`} className="hover:underline">
            {currentContact.email}
          </a>
        </div>
        <div className="text-md">
          <span className="font-medium">Тег:</span>{' '}
          <span
            className={cn(
              `text-sm font-medium py-1.5 px-2.5 rounded-md bg-${labelColors.bg} text-${labelColors.text}`,
            )}>
            {label.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
