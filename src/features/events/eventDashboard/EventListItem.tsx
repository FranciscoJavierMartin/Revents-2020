import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import {
  EVENT_DETAIL_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
} from '../../../app/common/constants/routes';
import { IAttendant, IEvent } from '../../../app/common/interfaces/models';
import EventListAttendee from './EventListAttendee';
import { deleteEventInFirestore } from '../../../app/api/firestore/firestoreService';

interface EventListItemProps {
  event: IEvent;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>
                Hosted by{' '}
                <Link to={`${PROFILE_PAGE_ROUTE}/${event.hostedUid}`}>
                  {event.hostedBy}
                </Link>
              </Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />{' '}
          {event.date && format(event.date, 'MMMM d, yyyy h:mm a')}
          {/*<Icon name='marker' /> {event.venue.address}*/}
          <Icon name='marker' /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees &&
            event.attendees.map((attendee: IAttendant) => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          color='red'
          floated='right'
          content='Delete'
          onClick={() => deleteEventInFirestore(event.id)}
        />
        <Button
          as={Link}
          to={`${EVENT_DETAIL_PAGE_ROUTE}/${event.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
