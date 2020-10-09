import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Comment, Header, Segment } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import {
  firebaseObjectToArray,
  getEventChatRef,
} from '../../../app/api/firestore/firebaseService';
import { PROFILE_PAGE_ROUTE } from '../../../app/common/constants/routes';
import { IComment } from '../../../app/common/interfaces/models';
import { IRootState } from '../../../app/common/interfaces/states';
import { listenToEventChat } from '../../../app/store/events/eventActions';
import EventDetailedChatForm from './EventDetailedChatForm';
import { eventActionsName } from '../../../app/common/constants/actionsNames';
import { createDataTree } from '../../../app/utils/utils';

interface IEventDetailedChatProps {
  eventId: string;
}

const EventDetailedChat: React.FC<IEventDetailedChatProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const comments = useSelector<IRootState, IComment[]>(
    (state) => state.event.comments
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
        <EventDetailedChatForm eventId={eventId} closeForm={setShowReplayForm}/>
        <Comment.Group>
          {createDataTree(comments).map((comment: IComment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author
                  as={Link}
                  to={`${PROFILE_PAGE_ROUTE}/${comment.uid}`}
                >
                  {comment.diplayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text
                    .split('\n')
                    .map((text: string, index: number) => (
                      <span key={index}>
                        {text}
                        <br />
                      </span>
                    ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() => {
                      setShowReplayForm({
                        open: true,
                        commentId: comment.id,
                      });
                    }}
                  >
                    Replay
                  </Comment.Action>
                  {showReplayForm.open &&
                    showReplayForm.commentId === comment.id && (
                      <EventDetailedChatForm
                        eventId={eventId}
                        parentId={comment.id}
                        closeForm={handleCloseReplayForm}
                      />
                    )}
                </Comment.Actions>
              </Comment.Content>
              {comment.childNodes?.length > 0 && (
                <Comment.Group>
                  {comment.childNodes.reverse().map((child: IComment) => (
                    <Comment key={child.id}>
                      <Comment.Avatar
                        src={child.photoURL || '/assets/user.png'}
                      />
                      <Comment.Content>
                        <Comment.Author
                          as={Link}
                          to={`${PROFILE_PAGE_ROUTE}/${child.uid}`}
                        >
                          {child.diplayName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{formatDistance(child.date, new Date())}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {child.text
                            .split('\n')
                            .map((text: string, index: number) => (
                              <span key={index}>
                                {text}
                                <br />
                              </span>
                            ))}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() => {
                              setShowReplayForm({
                                open: true,
                                commentId: child.id,
                              });
                            }}
                          >
                            Replay
                          </Comment.Action>
                          {showReplayForm.open &&
                            showReplayForm.commentId === child.id && (
                              <EventDetailedChatForm
                                eventId={eventId}
                                parentId={child.id}
                                closeForm={handleCloseReplayForm}
                              />
                            )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
};

export default EventDetailedChat;
