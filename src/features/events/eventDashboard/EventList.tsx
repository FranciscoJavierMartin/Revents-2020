import React from 'react';
import { IEvent } from '../../../app/interfaces';
import EventListItem from './EventListItem';

interface IEventListProps {
  events: IEvent[];
  selectEvent: (event: IEvent | null) => void;
  deleteEvent: (id: string) => void;
}

const EventList: React.FC<IEventListProps> = ({ events, selectEvent, deleteEvent }) => {
  return (
    <>
      {events.map((event: IEvent) => (
        <EventListItem event={event} key={event.id} selectEvent={selectEvent} deleteEvent={deleteEvent}/>
      ))}
    </>
  );
};

export default EventList;
