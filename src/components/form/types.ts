import { Control, FieldValues, Path, PathValue, RegisterOptions } from 'react-hook-form';

interface BaseFormInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T, any>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  range?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
}

export default BaseFormInputProps;
