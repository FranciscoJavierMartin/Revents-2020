import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import {
  CREATE_EVENT_PAGE_ROUTE,
  EVENTS_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
} from '../../app/constants/routes';


interface INavBarProps {}

const NavBar: React.FC<INavBarProps> = () => {
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
      </Container>
    </Menu>
  );
};

export default NavBar;
