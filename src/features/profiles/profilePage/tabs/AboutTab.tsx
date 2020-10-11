import { format } from 'date-fns';
import React, { useState } from 'react';
import { Grid, Header, Button, Tab } from 'semantic-ui-react';
import ProfileForm from './ProfileForm';

interface IAboutTabProps {
  profile: any;
  isCurrentUser: boolean;
}

//FIXME: Fix error on show date
const AboutTab: React.FC<IAboutTabProps> = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              onClick={() =>
                setEditMode((previousState: boolean) => !previousState)
              }
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>
                  Member since:{' '}
                  {profile &&
                    profile.createdAt &&
                    format(new Date(profile.createdAt), 'dd MMM yyyy')}
                </strong>
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default AboutTab;
