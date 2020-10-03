import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import { LOGIN_PAGE_ROUTE } from '../../app/common/constants/routes';

interface ISignOutMenuProps {}

const SignOutMenu: React.FC<ISignOutMenuProps> = () => {
  return (
    <Menu.Item position='right'>
      <Button basic inverted content='Login' as={Link} to={LOGIN_PAGE_ROUTE} />
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
