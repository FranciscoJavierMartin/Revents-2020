import React from 'react';
import { List, Image } from 'semantic-ui-react';

interface IEventListAttendeeProps {
  attendee: any;
}

const EventListAttendee: React.FC<IEventListAttendeeProps> = ({ attendee }) => {
  return (
    <List.Item>
      <Image size='mini' circular src={attendee.photoURL} />
    </List.Item>
  );
};

export default EventListAttendee;
