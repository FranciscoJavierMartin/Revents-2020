import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import { IRootState } from '../../../../app/common/interfaces/states';
import useFirestoreCollection from '../../../../app/hooks/useFirestoreCollection';
import LoadingComponent from '../../../../app/layout/LoadingComponent';
import ProfileCard from './components/ProfileCard';

interface IFollowingTabProps {
  profile: any;
  isCurrentUser: boolean;
  users: any[];
  getUsersFromFirebase: any;
  listenToUsersFromFirebase: any;
  title: string;
  noUsersMessage: string;
}

//FIXME: Fix error on show date
const FollowingTab: React.FC<IFollowingTabProps> = ({
  profile,
  isCurrentUser,
  users,
  getUsersFromFirebase,
  listenToUsersFromFirebase,
  title,
  noUsersMessage,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.async.isLoading
  );

  useFirestoreCollection({
    query: () => getUsersFromFirebase(profile.id),
    data: (data: any) => dispatch(listenToUsersFromFirebase(data)),
    deps: [dispatch, profile.id],
  });

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={title} />
        </Grid.Column>
        <Grid.Column width={16}>
          {isLoading ? (
            <LoadingComponent />
          ) : users.length === 0 ? (
            <h1>{noUsersMessage}</h1>
          ) : (
            <Card.Group itemsPerRow={5}>
              {users.map((user: any) => (
                <ProfileCard profile={user} key={user.id} />
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default FollowingTab;
