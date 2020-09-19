import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

interface ISignOutMenuProps {
  signOut: () => void;
}

const SignOutMenu: React.FC<ISignOutMenuProps> = ({ signOut }) => {
  return (
    <Menu.Item position='right'>
      <Button
        basic
        inverted
        content='Login'
        onClick={() => signOut()}
      />
      <Button
        basic
        inverted
        content='Register'
        style={{ marginLeft: '0.5em' }}
      />
    </Menu.Item>
  );
};

export default SignOutMenu;
