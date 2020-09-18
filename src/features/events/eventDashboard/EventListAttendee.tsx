import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { IAttendee } from '../../../app/interfaces';

interface IEventListAttendeeProps {
  attendee: IAttendee;
}

const EventListAttendee: React.FC<IEventListAttendeeProps> = ({ attendee }) => {
  return (
    <List.Item>
      <Image size='mini' circular src={attendee.photoURL} />
    </List.Item>
  );
};

export default EventListAttendee;
