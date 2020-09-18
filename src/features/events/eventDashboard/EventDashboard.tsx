import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import { sampleData } from '../../../app/api/sampleData';
import { IEvent } from '../../../app/interfaces';

interface IEventDashboardProps {
  formOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectEvent: (event: IEvent | null) => void;
  selectedEvent: IEvent | null;
}

const EventDashboard: React.FC<IEventDashboardProps> = ({
  formOpen,
  setFormOpen,
  selectEvent,
  selectedEvent,
}) => {
  const [events, setEvents] = useState<IEvent[]>(sampleData);

  function handleCreateEvent(event: IEvent) {
    setEvents([...events, event]);
  }

  function handleUpdateEvent(updatedEvent: IEvent) {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
    );
    selectEvent(null);
    setFormOpen(false);
  }

  function handleDeleteEvent(eventId: string) {
    setEvents(events.filter((e) => e.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={selectEvent} deleteEvent={handleDeleteEvent}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvents={setEvents}
            createEvent={handleCreateEvent}
            selectedEvent={selectedEvent}
            updateEvent={handleUpdateEvent}
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
