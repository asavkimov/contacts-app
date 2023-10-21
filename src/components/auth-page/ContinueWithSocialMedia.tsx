import { GithubIcon, GoogleIcon } from '../icons';
import api from 'api';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContinueWithSocialMedia: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    api.auth.getGoogleRedirectResult(() => {
      navigate('/');
    });
  }, [navigate]);

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
    </div>
  );
};

export default ContinueWithSocialMedia;
