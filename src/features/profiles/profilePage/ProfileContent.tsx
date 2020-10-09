import React from 'react';
import { Tab } from 'semantic-ui-react';
import AboutTab from './tabs/AboutTab';
import EventsTab from './tabs/EventsTab';
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
    { menuItem: 'Events', render: () => <EventsTab profile={profile} isCurrentUser={isCurrentUser}/> },
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      activeIndex={2}
    />
  );
};

export default ProfileContent;
