import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { IEvent } from '../../../app/common/interfaces/models';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../app/common/interfaces/states';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { listenToEventsFromFirestore } from '../../../app/api/firestore/firestoreService';
import { listenToEvents } from '../../../app/store/events/eventActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';

interface IEventDashboardProps {}

const EventDashboard: React.FC<IEventDashboardProps> = () => {
  const dispatch = useDispatch();
  const events: IEvent[] = useSelector<IRootState, IEvent[]>(
    (state) => state.event.events
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.async.isLoading
  );

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: (events: any) => dispatch(listenToEvents(events)),
    deps: [dispatch],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {isLoading ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <EventList events={events} />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
