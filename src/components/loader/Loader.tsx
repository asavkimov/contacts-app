import { LoadingIcon } from '../icons';
import { FC } from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
}

const Loader: FC<Props> = (props) => {
  return (
    <div className={cn('w-full flex items-center justify-center', props.className)}>
      <LoadingIcon />
    </div>
  );
};

export default Loader;
