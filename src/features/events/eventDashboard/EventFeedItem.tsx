import { formatDistance } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Feed } from 'semantic-ui-react';
import {
  EVENT_DETAIL_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
} from '../../../app/common/constants/routes';

interface IEventFeedItemProps {
  post: any;
}

const EventFeedItem: React.FC<IEventFeedItemProps> = ({ post }) => {
  let summary;

  switch (post.code) {
    case 'joined-event':
      summary = (
        <>
          <Link to={`${PROFILE_PAGE_ROUTE}/${post.userUid}`}>
            {post.displayName}{' '}
          </Link>{' '}
          has signed up to{' '}
          <Link to={`${EVENT_DETAIL_PAGE_ROUTE}/${post.eventId}`}>
            {post.title}
          </Link>
        </>
      );
      break;
    case 'left-event':
      summary = (
        <>
          <Link to={`${PROFILE_PAGE_ROUTE}/${post.userUid}`}>
            {post.displayName}{' '}
          </Link>{' '}
          has cancelled their place on{' '}
          <Link to={`${EVENT_DETAIL_PAGE_ROUTE}/${post.eventId}`}>
            {post.title}
          </Link>
        </>
      );
      break;
    default:
      summary = 'Something happened';
  }

  return (
    <Feed.Event>
      <Feed.Label image={post.photoURL} />
      <Feed.Content>
        <Feed.Date>
          {formatDistance(new Date(post.date), new Date())} ago
        </Feed.Date>
        <Feed.Summary>{summary}</Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
};

export default EventFeedItem;
