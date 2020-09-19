import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { CREATE_EVENT_PAGE_ROUTE } from '../../app/constants/routes';

interface ISignInMenuProps {
  signOut: () => void;
}

const SignInMenu: React.FC<ISignInMenuProps> = ({ signOut }) => {
  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src='/assets/user.png' />
      <Dropdown pointing='top left' text='Bob'>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={CREATE_EVENT_PAGE_ROUTE}
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item text='My profile' icon='user' />
          <Dropdown.Item
            text='Sign out'
            icon='power'
            onClick={() => signOut()}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignInMenu;
