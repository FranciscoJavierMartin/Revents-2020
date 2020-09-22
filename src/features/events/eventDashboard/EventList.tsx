import React from 'react';
import { IEvent } from '../../../app/interfaces/models';
import EventListItem from './EventListItem';

interface IEventListProps {
  events: IEvent[];
}

const EventList: React.FC<IEventListProps> = ({ events }) => {
  return (
    <>
      {events.map((event: IEvent) => (
        <EventListItem event={event} key={event.id}/>
      ))}
    </>
  );
};

export default EventList;
