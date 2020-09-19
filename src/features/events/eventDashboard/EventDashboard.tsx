import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { sampleData } from '../../../app/api/sampleData';
import { IEvent } from '../../../app/interfaces';

interface IEventDashboardProps {

}

const EventDashboard: React.FC<IEventDashboardProps> = () => {
  const [events, setEvents] = useState<IEvent[]>(sampleData);

  function handleDeleteEvent(eventId: string) {
    setEvents(events.filter((e) => e.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event filter</h2>
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
