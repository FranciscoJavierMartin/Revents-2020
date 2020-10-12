import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { socialLogin } from '../../app/api/firestore/firebaseService';
import { EVENTS_PAGE_ROUTE } from '../../app/common/constants/routes';

const SocialLogin: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Button
        icon='facebook'
        fluid
        color='facebook'
        style={{ marginBottom: 10 }}
        content='Login with Facebook'
        onClick={() => toast.error('Login with Facebook disabled by now')}
      />
      <Button
        icon='google'
        fluid
        color='google plus'
        style={{ marginBottom: 10 }}
        content='Login with Google'
        onClick={() => {
          socialLogin('google');
          history.push(EVENTS_PAGE_ROUTE);
        }}
      />
    </>
  );
};

export default SocialLogin;
