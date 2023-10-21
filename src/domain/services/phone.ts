import parsePhoneNumberFromString from 'libphonenumber-js';

export const formatPhoneToInter = (phone: string): string => {
  const parsedPhone = parsePhoneNumberFromString(phone);

  return parsedPhone?.isValid() && parsedPhone?.formatInternational()
    ? parsedPhone.formatInternational()
    : phone;
};
