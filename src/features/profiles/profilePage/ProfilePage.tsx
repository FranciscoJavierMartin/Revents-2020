import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { getUserProfile } from '../../../app/api/firestore/firestoreService';
import {
  IAsyncState,
  IProfileState,
  IRootState,
} from '../../../app/common/interfaces/states';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { listenToSelectedUserProfile } from '../../../app/store/profile/profileActions';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

interface IProfilePageParams {
  id: string;
}

interface IProfilePageProps extends RouteComponentProps<IProfilePageParams> {}

const ProfilePage: React.FC<IProfilePageProps> = ({ match }) => {
  const dispatch = useDispatch();
  const { selectedProfile } = useSelector<IRootState, IProfileState>(
    (state) => state.profile
  );
  const { currentUser } = useSelector<IRootState, any>((state) => state.auth);
  const { isLoading, error } = useSelector<IRootState, IAsyncState>(
    (state) => state.async
  );

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile: any) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  return (isLoading && !selectedProfile) || (!selectedProfile && !error) ? (
    <LoadingComponent content='Loading profile...' />
  ) : (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={selectedProfile}
          isCurrentUser={currentUser.uid === selectedProfile.id}
        />
        <ProfileContent
          profile={selectedProfile}
          isCurrentUser={currentUser.uid === selectedProfile.id}
        />
      </Grid.Column>
    </Grid>
  );
};

export default ProfilePage;
