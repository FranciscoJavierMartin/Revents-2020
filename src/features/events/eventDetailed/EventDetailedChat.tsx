import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment, Header, Segment } from 'semantic-ui-react';
import {
  firebaseObjectToArray,
  getEventChatRef,
} from '../../../app/api/firestore/firebaseService';
import { IComment } from '../../../app/common/interfaces/models';
import { IRootState } from '../../../app/common/interfaces/states';
import { listenToEventChat } from '../../../app/store/events/eventActions';
import EventDetailedChatForm from './EventDetailedChatForm';
import { eventActionsName } from '../../../app/common/constants/actionsNames';
import { createDataTree } from '../../../app/utils/utils';
import CommentList from './CommentList';

interface IEventDetailedChatProps {
  eventId: string;
}

const EventDetailedChat: React.FC<IEventDetailedChatProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const comments = useSelector<IRootState, IComment[]>(
    (state) => state.event.comments
  );
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.authenticated
  );
  const [showReplayForm, setShowReplayForm] = useState<{
    open: boolean;
    commentId: string;
  }>({
    open: false,
    commentId: '',
  });

  function handleCloseReplayForm() {
    setShowReplayForm({
      open: false,
      commentId: '',
    });
  }

  useEffect(() => {
    getEventChatRef(eventId).on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch(
          listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
        );
      }
    });

    return () => {
      dispatch({ type: eventActionsName.CLEAR_COMMENTS });
      getEventChatRef(eventId).off();
    };
  }, [dispatch, eventId]);

  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        {isAuthenticated && (
          <EventDetailedChatForm
            eventId={eventId}
            closeForm={setShowReplayForm}
          />
        )}
        <Comment.Group>
          <CommentList
            comments={createDataTree(comments).reverse()}
            closeForm={setShowReplayForm}
            showReplayForm={showReplayForm}
            eventId={eventId}
            handleCloseReplayForm={handleCloseReplayForm}
          />
        </Comment.Group>
      </Segment>
    </>
  );
};

export default EventDetailedChat;
