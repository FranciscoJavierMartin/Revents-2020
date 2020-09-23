import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import {
  CREATE_EVENT_PAGE_ROUTE,
  EVENTS_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
} from '../../app/common/constants/routes';
import { IAuthState, IRootState } from '../../app/common/interfaces/states';
import SignInMenu from './SignedInMenu';
import SignOutMenu from './SignOutMenu';

interface INavBarProps {}

const NavBar: React.FC<INavBarProps> = () => {
  const { authenticated } = useSelector<IRootState, IAuthState>(
    (state) => state.auth
  );

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} to={HOME_PAGE_ROUTE} exact>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
          Re-vents
        </Menu.Item>
        <Menu.Item name='Events' as={NavLink} to={EVENTS_PAGE_ROUTE} />
        <Menu.Item as={NavLink} to={CREATE_EVENT_PAGE_ROUTE}>
          <Button positive inverted content='Create Event' />
        </Menu.Item>
        {authenticated ? <SignInMenu/>:<SignOutMenu />}
      </Container>
    </Menu>
  );
};

export default NavBar;
