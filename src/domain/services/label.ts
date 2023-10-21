import { Label } from 'domain/entities/label';

export const getLabelColor = (label: Label) => {
  const data = {
    bg: '',
    text: 'white',
  };

  switch (label.id) {
    case 1:
      data.bg = 'green';
      break;
    case 2:
      data.bg = 'blue';
      break;
    case 3:
      data.bg = 'yellow';
      data.text = 'primary';
      break;
    case 4:
      data.bg = 'red-600';
      break;
  }

  return data;
};
