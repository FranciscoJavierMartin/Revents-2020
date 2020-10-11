import React from 'react';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import { IComment } from '../../../app/common/interfaces/models';
import { PROFILE_PAGE_ROUTE } from '../../../app/common/constants/routes';
import EventDetailedChatForm from './EventDetailedChatForm';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../app/common/interfaces/states';

interface ICommentListProps {
  eventId: string;
  comments: IComment[];
  showReplayForm: {
    open: boolean;
    commentId: string;
  };
  closeForm: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      commentId: string;
    }>
  >;
  handleCloseReplayForm: () => void;
}

const CommentList: React.FC<ICommentListProps> = (props) => {
  const {
    eventId,
    comments,
    showReplayForm,
    closeForm,
    handleCloseReplayForm,
  } = props;
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.authenticated
  );
  return (
    <>
      {comments.map((comment: IComment) => (
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
              {comment.text.split('\n').map((text: string, index: number) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
            </Comment.Text>
            {isAuthenticated && (
              <Comment.Actions>
                <Comment.Action
                  onClick={() => {
                    closeForm({
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
            )}
          </Comment.Content>
          {comment.childNodes.length > 0 && (
            <Comment.Group>
              <CommentList {...props} comments={comment.childNodes.reverse()} />
            </Comment.Group>
          )}
        </Comment>
      ))}
    </>
  );
};

export default CommentList;
