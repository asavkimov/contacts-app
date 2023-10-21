import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ className, to, children, ...rest }) => {
  if (to) {
    return (
      <Link to={to} className={cn('text-sm py-3 btn', className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn('text-sm btn', className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
