import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button className={cn('min-h-[40px] text-sm py-3 btn', className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
