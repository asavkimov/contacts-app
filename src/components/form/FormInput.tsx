import { Controller, FieldValues } from 'react-hook-form';
import Input, { InputProps } from 'components/ui/Input';
import BaseFormInputProps from './types';

const FormInput = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  condition,
  ...rest
}: BaseFormInputProps<T> & InputProps & { condition?: (val: string) => boolean }) => {
  return (
    <Controller
      defaultValue={defaultValue}
      rules={rules}
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur }, formState: { errors } }) => {
        return (
          <Input
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

export default FormInput;
