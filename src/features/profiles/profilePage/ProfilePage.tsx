import React, { useEffect } from 'react';
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
import {
  clearSelectedUser,
  listenToSelectedUserProfile,
} from '../../../app/store/profile/profileActions';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

interface IProfilePageParams {
  id: string;
}

interface IProfilePageProps extends RouteComponentProps<IProfilePageParams> {}

const ProfilePage: React.FC<IProfilePageProps> = ({ match }) => {
  const dispatch = useDispatch();
  const { selectedProfile, currentUserProfile } = useSelector<
    IRootState,
    IProfileState
  >((state) => state.profile);
  const { currentUser } = useSelector<IRootState, any>((state) => state.auth);
  const { isLoading, error } = useSelector<IRootState, IAsyncState>(
    (state) => state.async
  );
  const profile =
    match.params.id === currentUser?.uid ? currentUserProfile : selectedProfile;

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile: any) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser?.uid,
  });

  useEffect(() => {
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch]);

  return (isLoading && !profile) || (!profile && !error) ? (
    <LoadingComponent content='Loading profile...' />
  ) : !profile ? (
    <h1>No profile found</h1>
  ) : (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={profile}
          isCurrentUser={currentUser?.uid === profile.id}
        />
        <ProfileContent
          profile={profile}
          isCurrentUser={currentUser?.uid === profile.id}
        />
      </Grid.Column>
    </Grid>
  );
};

export default ProfilePage;
