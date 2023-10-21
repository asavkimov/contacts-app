import { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  classes?: {
    root?: string;
    label?: string;
    input?: string;
    error?: string;
  };
  helperText?: string;
}

const Input: FC<InputProps> = ({ classes, helperText, label, ...rest }) => {
  return (
    <label className={cn('min-h-[40px] block', classes?.root)}>
      <span className={cn('block mb-1 text-xs font-medium text-gray-700', classes?.label)}>
        {label}
      </span>
      <input
        {...rest}
        className={cn('form-input', helperText && 'border-red-500', classes?.input)}
      />
      {helperText && (
        <p className={cn('block mt-1 text-xs font-medium text-red-600', classes?.error)}>
          {helperText}
        </p>
      )}
    </label>
  );
};

export default Input;
