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
  setRetainState,
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
  const {
    events,
    moreEvents,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector<IRootState, IEventsState>((state) => state.event);
  const isLoadingEvents = useSelector<IRootState, boolean>(
    (state) => state.async.isLoading
  );
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.authenticated
  );
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!retainState) {
      setIsInitialLoading(true);
      (dispatch(fetchEvents(filter, startDate, limit)) as any).then(() => {
        setIsInitialLoading(false);
      });
    }
    return () => {
      dispatch(setRetainState());
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
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
        <EventFilters isLoading={isLoadingEvents} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={isLoadingEvents} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
