import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import { EVENT_DETAIL_PAGE_ROUTE } from '../../../app/common/constants/routes';
import { IAttendant, IEvent } from '../../../app/common/interfaces/models';
import { deleteEvent } from '../../../app/store/events/eventActions';
import EventListAttendee from './EventListAttendee';

interface EventListItemProps {
  event: IEvent;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
  const dispatch = useDispatch();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {event.date && format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name='marker' /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees && event.attendees.map((attendee: IAttendant) => (
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
          onClick={() => dispatch(deleteEvent(event))}
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
