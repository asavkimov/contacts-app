import { Controller, FieldValues } from 'react-hook-form';
import BaseFormInputProps from './types';
import Select, { SelectProps } from 'components/ui/Select';

const FormSelect = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  condition,
  ...rest
}: BaseFormInputProps<T> & SelectProps & { condition?: (val: string) => boolean }) => {
  return (
    <Controller
      defaultValue={defaultValue}
      rules={rules}
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur }, formState: { errors } }) => {
        return (
          <Select
            {...rest}
            onChange={(event) => {
              if (event.target.value && condition && !condition(event.target.value)) return;
              onChange(event);
            }}
            onBlur={onBlur}
            value={value ?? ''}
            helperText={(errors[name]?.message as string) ?? ''}
          />
        );
      }}
    />
  );
};

export default FormSelect;
