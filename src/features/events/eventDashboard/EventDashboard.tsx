import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { IEvent } from '../../../app/interfaces/models';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../app/interfaces/states';

interface IEventDashboardProps {}

const EventDashboard: React.FC<IEventDashboardProps> = () => {
  const events: IEvent[] = useSelector<IRootState, IEvent[]>(
    (state) => state.event.events
  );

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event filter</h2>
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
