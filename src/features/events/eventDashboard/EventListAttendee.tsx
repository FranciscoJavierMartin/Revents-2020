import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import { PROFILE_PAGE_ROUTE } from '../../../app/common/constants/routes';
import { IAttendant } from '../../../app/common/interfaces/models';

interface IEventListAttendeeProps {
  attendee: IAttendant;
}

const EventListAttendee: React.FC<IEventListAttendeeProps> = ({ attendee }) => {
  return (
    <List.Item as={Link} to={`${PROFILE_PAGE_ROUTE}/${attendee.id}`}>
      <Image size='mini' circular src={attendee.photoURL} />
    </List.Item>
  );
};

export default EventListAttendee;
