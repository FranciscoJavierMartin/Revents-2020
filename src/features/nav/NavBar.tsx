import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import {
  CREATE_EVENT_PAGE_ROUTE,
  EVENTS_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
} from '../../app/constants/routes';
import SignInMenu from './SignedInMenu';
import SignOutMenu from './SignOutMenu';

interface INavBarProps {}

const NavBar: React.FC<INavBarProps> = () => {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  function handleSignOut(): void {
    setAuthenticated(false);
    history.push(HOME_PAGE_ROUTE);
  }

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} to={HOME_PAGE_ROUTE} exact>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
          Re-vents
        </Menu.Item>
        <Menu.Item name='Events' as={NavLink} to={EVENTS_PAGE_ROUTE} />
        {authenticated && (
          <Menu.Item as={NavLink} to={CREATE_EVENT_PAGE_ROUTE}>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignInMenu signOut={handleSignOut} />
        ) : (
          <SignOutMenu signOut={handleSignOut} />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
