import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feed, Header, Loader, Segment } from 'semantic-ui-react';
import {
  firebaseObjectToArray,
  getUserFeedRef,
} from '../../../app/api/firestore/firebaseService';
import { IRootState } from '../../../app/common/interfaces/states';
import { listenToFeed } from '../../../app/store/profile/profileActions';
import EventFeedItem from './EventFeedItem';

const EventsFeed: React.FC = () => {
  const dispatch = useDispatch();
  const feed = useSelector<IRootState, any[]>((state) => state.profile.feed);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.async.isLoading
  );

  useEffect(() => {
    getUserFeedRef().on('value', (snapshot) => {
      if (snapshot.exists()) {
        const feedFromFirebase = firebaseObjectToArray(
          snapshot.val()
        ).reverse();
        dispatch(listenToFeed(feedFromFirebase));
      }
    });
    return () => {
      getUserFeedRef().off();
    };
  }, [dispatch]);

  return (
    <>
      <Header attached color='teal' icon='newspaper' content='News feed' />
      <Segment attached='bottom'>
        <Feed>
          {isLoading ? (
            <Loader />
          ) : feed.length === 0 ? (
            <h1>No feeds yet.</h1>
          ) : (
            feed.map((item: any) => <EventFeedItem key={item.id} post={item} />)
          )}
        </Feed>
      </Segment>
    </>
  );
};

export default EventsFeed;
