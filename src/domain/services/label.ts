import { Label } from 'domain/entities/label';

export const getLabelColor = (label: Label) => {
  const data = {
    bg: '',
    text: '',
  };

  switch (label.id) {
    case 1:
      data.bg = '#a6c2be';
      data.text = '#21675e';
      break;
    case 2:
      data.bg = '#c199ff';
      data.text = '#6600ff';
      break;
    case 3:
      data.bg = '#ffff93';
      data.text = '#333314';
      break;
  }

  return data;
};
