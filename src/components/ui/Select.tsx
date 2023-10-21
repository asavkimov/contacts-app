import { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: any }[];
  label: string;
  classes?: {
    root?: string;
    label?: string;
    input?: string;
    error?: string;
  };
  helperText?: string;
}

const Select: FC<SelectProps> = ({ classes, helperText, label, options, placeholder, ...rest }) => {
  return (
    <label className={cn('min-h-[40px] block', classes?.root)}>
      <span className={cn('block mb-1 text-xs font-medium text-gray-700', classes?.label)}>
        {label}
      </span>
      <select
        {...rest}
        className={cn('form-input', helperText && 'border-red-500', classes?.input)}>
        <option value="" className="text-xs">
          {placeholder ?? 'Не выбран'}
        </option>
        {options.map((option, idx) => (
          <option value={option.value} key={idx}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className={cn('block mt-1 text-xs font-medium text-red-600', classes?.error)}>
          {helperText}
        </p>
      )}
    </label>
  );
};

export default Select;
