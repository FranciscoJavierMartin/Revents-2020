import React from 'react';
import { Tab } from 'semantic-ui-react';
import AboutTab from './tabs/AboutTab';
import PhotosTab from './tabs/PhotosTab';

interface IProfileContentProps {
  profile: any;
  isCurrentUser: boolean;
}

const ProfileContent: React.FC<IProfileContentProps> = ({
  profile,
  isCurrentUser,
}) => {
  const panes = [
    {
      menuItem: 'About',
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: 'Photos',
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    { menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane> },
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  );
};

export default ProfileContent;
