import React from 'react';
import EventListItem from './EventListItem';

interface IEventListProps {
  events: any[]
}

const EventList: React.FC<IEventListProps> = ({events}) => {
  return (
    <>
    {events.map((event: any) => (
      <EventListItem event={event} key={event.id}/>
    ))}
     
    </>
  );
};

export default EventList;
