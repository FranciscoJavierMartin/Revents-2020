import React, { useState } from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import './styles.scss';

function App() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <NavBar setFormOpen={setFormOpen} />
      <Container className='main'>
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen}/>
      </Container>
    </React.Fragment>
  );
}

export default App;
