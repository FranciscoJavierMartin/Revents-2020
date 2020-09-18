import React, { useState } from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import './styles.scss';
import { IEvent } from '../interfaces';

function App() {
  const [formOpen, setFormOpen] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  function handleSelectEvent(event: IEvent | null): void {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen(): void {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <React.Fragment>
      <NavBar setFormOpen={setFormOpen} />
      <Container className='main'>
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
        />
      </Container>
    </React.Fragment>
  );
}

export default App;
