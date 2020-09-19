import React from 'react';
import { IEvent } from '../../../app/interfaces';
import EventListItem from './EventListItem';

interface IEventListProps {
  events: IEvent[];
  deleteEvent: (id: string) => void;
}

const EventList: React.FC<IEventListProps> = ({ events, deleteEvent }) => {
  return (
    <>
      {events.map((event: IEvent) => (
        <EventListItem event={event} key={event.id} deleteEvent={deleteEvent}/>
      ))}
    </>
  );
};

export default EventList;
