import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import {
  IEventsState,
  IRootState,
} from '../../../app/common/interfaces/states';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import {
  clearEvents,
  fetchEvents,
} from '../../../app/store/events/eventActions';
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
    dispatch(clearEvents());
    setLastSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    setIsInitialLoading(true);
    (dispatch(fetchEvents(predicate, limit, lastDocSnapshot)) as any).then(
      (lastVisible: any) => {
        setLastSnapshot(lastVisible);
        setIsInitialLoading(false);
      }
    );
    return () => {
      dispatch(clearEvents());
    };
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
          <EventList
            events={events}
            getNextEvents={handleFetchNextEvents}
            loading={isLoadingEvents}
            moreEvents={moreEvents}
          />
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
      <Grid.Column width={10}>
        <Loader active={isLoadingEvents} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
