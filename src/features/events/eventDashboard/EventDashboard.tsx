import React, { useEffect, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import {
  IEventsState,
  IRootState,
} from '../../../app/common/interfaces/states';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { listenToEventsFromFirestore } from '../../../app/api/firestore/firestoreService';
import {
  fetchEvents,
  listenToEvents,
} from '../../../app/store/events/eventActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import {
  FilterKeyType,
  FilterValueType,
} from '../../../app/common/constants/customTypes';
import NoEvents from './NoEvents';
import EventsFeed from './EventsFeed';

interface IEventDashboardProps {}

const EventDashboard: React.FC<IEventDashboardProps> = () => {
  const limit = 2;
  const dispatch = useDispatch();
  const { events, moreEvents } = useSelector<IRootState, IEventsState>(
    (state) => state.event
  );
  const isLoadingEvents = useSelector<IRootState, boolean>(
    (state) => state.async.isLoading
  );
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.authenticated
  );
  const [lastDocSnapshot, setLastSnapshot] = useState<any>(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
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
    query: () => listenToEventsFromFirestore(predicate, limit),
    data: (events: any) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });

  useEffect(() => {
    setIsInitialLoading(true);
    (dispatch(fetchEvents(predicate, limit, lastDocSnapshot)) as any).then(
      (lastVisible: any) => {
        setLastSnapshot(lastVisible);
        setIsInitialLoading(false);
      }
    );
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    (dispatch(fetchEvents(predicate, limit, lastDocSnapshot)) as any).then(
      (lastVisible: any) => {
        setLastSnapshot(lastVisible);
      }
    );
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        {isInitialLoading ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : events && events.length > 0 ? (
          <>
            <EventList events={events} />
            <Button
              loading={isLoadingEvents}
              disabled={!moreEvents}
              onClick={handleFetchNextEvents}
              color='green'
              content='More ...'
              floated='right'
            />
          </>
        ) : (
          <NoEvents />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        {isAuthenticated && <EventsFeed />}
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          isLoading={isLoadingEvents}
        />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
