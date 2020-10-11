import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react';
import {
  followUser,
  getFollowingDoc,
  unfollowUser,
} from '../../../app/api/firestore/firestoreService';
import { profileActionName } from '../../../app/common/constants/actionsNames';
import { IRootState } from '../../../app/common/interfaces/states';
import {
  setFollowUser,
  setUnfollowUser,
} from '../../../app/store/profile/profileActions';

interface IProfileHeaderProps {
  profile: any;
  isCurrentUser: boolean;
}

const ProfileHeader: React.FC<IProfileHeaderProps> = ({
  profile,
  isCurrentUser,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.authenticated
  );
  const isFollowingUser = useSelector<IRootState, boolean>(
    (state) => state.profile.isFollowingUser
  );

  const fetchFollowingDoc = useCallback(
    async function () {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [profile.id, dispatch]
  );

  useEffect(() => {
    if (!isCurrentUser && isAuthenticated) {
      setIsLoading(true);
      fetchFollowingDoc().finally(() => setIsLoading(false));
    }
    return () => {
      dispatch({ type: profileActionName.CLEAR_FOLLOWINGS });
    };
  }, [dispatch, profile.id, isCurrentUser, fetchFollowingDoc, isAuthenticated]);

  async function handleFollowUser() {
    setIsLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUnfollowUser() {
    setIsLoading(true);
    try {
      await unfollowUser(profile);
      dispatch(setUnfollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: 'block', marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Followers' value={profile.followersCount || 0} />
            <Statistic label='Following' value={profile.followingCount || 0} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button
                    fluid
                    color='teal'
                    content={isFollowingUser ? 'Following' : 'Not following'}
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button
                    onClick={
                      isFollowingUser
                        ? () => handleUnfollowUser()
                        : () => handleFollowUser()
                    }
                    loading={isLoading}
                    basic
                    fluid
                    color={isFollowingUser ? 'red' : 'green'}
                    content={isFollowingUser ? 'Unfollow' : 'Follow'}
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ProfileHeader;
