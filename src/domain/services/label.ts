import { Label } from 'domain/entities/label';

export const getLabelColor = (label: Label) => {
  const data = {
    bg: '',
    text: '',
  };

  switch (label.id) {
    case 1:
      data.bg = 'green-light';
      data.text = 'green';
      break;
    case 2:
      data.bg = 'blue-light';
      data.text = 'blue';
      break;
    case 3:
      data.bg = 'yellow';
      data.text = 'yellow-dark';
      break;
  }

  return data;
};
