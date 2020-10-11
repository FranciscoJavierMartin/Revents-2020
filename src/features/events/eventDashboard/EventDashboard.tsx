import React, { useState } from 'react';
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
import {
  FilterKeyType,
  FilterValueType,
} from '../../../app/common/constants/customTypes';
import NoEvents from './NoEvents';
import EventsFeed from './EventsFeed';

interface IEventDashboardProps {}

const EventDashboard: React.FC<IEventDashboardProps> = () => {
  const dispatch = useDispatch();
  const events: IEvent[] = useSelector<IRootState, IEvent[]>(
    (state) => state.event.events
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.async.isLoading
  );
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.authenticated
  );
  const [predicate, setPredicate] = useState(
    new Map<FilterKeyType, FilterValueType>([
      ['startDate', new Date()],
      ['filter', 'all'],
    ])
  );

  function handleSetPredicate(key: FilterKeyType, value: FilterValueType) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events: any) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {isLoading ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : events && events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <NoEvents />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        {isAuthenticated && <EventsFeed />}
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          isLoading={isLoading}
        />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
