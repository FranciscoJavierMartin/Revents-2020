import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { signOutFirebase } from '../../app/api/firestore/firebaseService';
import {
  CREATE_EVENT_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
} from '../../app/common/constants/routes';
import { IAuthState, IRootState } from '../../app/common/interfaces/states';

interface ISignInMenuProps {}

const SignInMenu: React.FC<ISignInMenuProps> = () => {
  const { currentUser } = useSelector<IRootState, IAuthState>(
    (state) => state.auth
  );
  const history = useHistory();

  async function handleSignOut() {
    try {
      await signOutFirebase();
      history.push(HOME_PAGE_ROUTE);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUser.photoURL || '/assets/user.png'}
      />
      <Dropdown pointing='top left' text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={CREATE_EVENT_PAGE_ROUTE}
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item text='My profile' icon='user' />
          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignInMenu;
