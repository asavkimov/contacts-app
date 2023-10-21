import { GithubIcon, GoogleIcon } from '../icons';
import api from 'api';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoaderFullScreen from '../loader/LoaderFullScreen';

const ContinueWithSocialMedia: FC = () => {
  const navigate = useNavigate();
  const [redirectResponseLoading, setRedirectResponseLoading] = useState(false);

  useEffect(() => {
    listenRedirectResponse();
  }, []);

  const listenRedirectResponse = async () => {
    try {
      setRedirectResponseLoading(true);
      const user = await api.auth.getRedirectAuthResult();

      if (user) {
        navigate('/');
      }
    } finally {
      setRedirectResponseLoading(false);
    }
  };

  const handleLoginViaGoogle = () => {
    api.auth.loginViaGoogle();
  };

  const handleLoginViaGithub = () => {
    api.auth.loginViaGithub();
  };

  return (
    <div className="pb-6 space-y-2 border-b border-gray-200">
      <button
        className="w-full py-3 btn btn-icon btn-white border border-primary-light"
        onClick={handleLoginViaGoogle}>
        <GoogleIcon />
        <span className="ml-2">Продолжить с Google</span>
      </button>
      <button
        className="w-full py-3 btn btn-icon btn-white border border-primary-light"
        onClick={handleLoginViaGithub}>
        <GithubIcon />
        <span className="ml-2">Продолжить с Github</span>
      </button>
      {redirectResponseLoading && <LoaderFullScreen />}
    </div>
  );
};

export default ContinueWithSocialMedia;
