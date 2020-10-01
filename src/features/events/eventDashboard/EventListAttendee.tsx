import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { IAttendant } from '../../../app/common/interfaces/models';

interface IEventListAttendeeProps {
  attendee: IAttendant;
}

const EventListAttendee: React.FC<IEventListAttendeeProps> = ({ attendee }) => {
  return (
    <List.Item>
      <Image size='mini' circular src={attendee.photoURL} />
    </List.Item>
  );
};

export default EventListAttendee;
