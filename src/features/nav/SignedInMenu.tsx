import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { signOutFirebase } from '../../app/api/firestore/firebaseService';
import {
  ACCOUNT_PAGE_ROUTE,
  CREATE_EVENT_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
} from '../../app/common/constants/routes';
import { IProfileState, IRootState } from '../../app/common/interfaces/states';

interface ISignInMenuProps {}

const SignInMenu: React.FC<ISignInMenuProps> = () => {
  const { currentUserProfile } = useSelector<IRootState, IProfileState>(
    (state) => state.profile
  );
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push(HOME_PAGE_ROUTE);
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUserProfile.photoURL || '/assets/user.png'}
      />
      <Dropdown pointing='top left' text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={CREATE_EVENT_PAGE_ROUTE}
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item
            as={Link}
            to={`${PROFILE_PAGE_ROUTE}/${currentUserProfile.uid}`}
            text='My profile'
            icon='user'
          />
          <Dropdown.Item
            text='My account'
            icon='settings'
            as={Link}
            to={ACCOUNT_PAGE_ROUTE}
          />
          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignInMenu;
