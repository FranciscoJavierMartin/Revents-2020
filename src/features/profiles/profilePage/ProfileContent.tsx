import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab, TabProps } from 'semantic-ui-react';
import {
  getFollowersCollection,
  getFollowingCollection,
} from '../../../app/api/firestore/firestoreService';
import {
  IProfileState,
  IRootState,
} from '../../../app/common/interfaces/states';
import {
  listenToFollowers,
  listenToFollowings,
} from '../../../app/store/profile/profileActions';
import AboutTab from './tabs/AboutTab';
import EventsTab from './tabs/EventsTab';
import FollowingTab from './tabs/FollowingTab';
import PhotosTab from './tabs/PhotosTab';

interface IProfileContentProps {
  profile: any;
  isCurrentUser: boolean;
}

const ProfileContent: React.FC<IProfileContentProps> = ({
  profile,
  isCurrentUser,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { followers, followings } = useSelector<IRootState, IProfileState>(
    (state) => state.profile
  );
  const panes = [
    {
      menuItem: 'About',
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },

    {
      menuItem: 'Events',
      render: () => (
        <EventsTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: 'Followers',
      render: () => (
        <FollowingTab
          key={1}
          profile={profile}
          isCurrentUser={isCurrentUser}
          getUsersFromFirebase={getFollowersCollection}
          listenToUsersFromFirebase={listenToFollowers}
          users={followers}
          title='Followers'
          noUsersMessage={
            isCurrentUser
              ? 'Nobody is following you'
              : `Nobody is following ${profile.displayName}`
          }
        />
      ),
    },
    {
      menuItem: 'Following',
      render: () => (
        <FollowingTab
          key={2}
          profile={profile}
          isCurrentUser={isCurrentUser}
          getUsersFromFirebase={getFollowingCollection}
          listenToUsersFromFirebase={listenToFollowings}
          users={followings}
          title='Followings'
          noUsersMessage={
            isCurrentUser
              ? 'You are not following anyone'
              : `${profile.displayName} is not following anyone`
          }
        />
      ),
    },
  ];

  if (isCurrentUser) {
    panes.splice(1, 0, {
      menuItem: 'Photos',
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    });
  }

  useEffect(() => {
    return () => {
      setActiveTab(0);
    };
  }, [profile.id]);

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      activeIndex={activeTab}
      onTabChange={(e, data: TabProps) =>
        setActiveTab(data.activeIndex as number)
      }
    />
  );
};

export default ProfileContent;
