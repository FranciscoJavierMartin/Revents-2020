import React from 'react';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';

const SocialLogin: React.FC = () => {
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
        onClick={() => toast.error('Login with Google disabled by now')}
      />
    </>
  );
};

export default SocialLogin;
