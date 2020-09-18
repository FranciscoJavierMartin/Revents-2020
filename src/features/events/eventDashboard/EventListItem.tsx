import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { IAttendee, IEvent } from '../../../app/interfaces';
import EventListAttendee from './EventListAttendee';

interface EventListItemProps {
  event: IEvent;
  selectEvent: (event: IEvent | null) => void;
  deleteEvent: (id: string) => void;
}

const EventListItem: React.FC<EventListItemProps> = ({
  event,
  selectEvent,
  deleteEvent,
}) => {
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
          <Icon name='clock' /> {event.date}
          <Icon name='marker' /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee: IAttendee) => (
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
          onClick={() => deleteEvent(event.id)}
        />
        <Button
          color='teal'
          floated='right'
          content='View'
          onClick={() => selectEvent(event)}
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
