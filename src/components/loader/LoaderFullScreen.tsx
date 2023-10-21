import { FC } from 'react';
import { createPortal } from 'react-dom';
import { LoadingIcon } from 'components/icons';

const LoaderFullScreen: FC = () => {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="w-full h-full mt-10 flex justify-center">
        <LoadingIcon />
      </div>
    </div>,
    document.body,
  );
};

export default LoaderFullScreen;
