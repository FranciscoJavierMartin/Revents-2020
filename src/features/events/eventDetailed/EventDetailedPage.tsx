import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { listenToEventFromFirestore } from '../../../app/api/firestore/firestoreService';
import { ERROR_PAGE_ROUTE } from '../../../app/common/constants/routes';
import { IEvent } from '../../../app/common/interfaces/models';
import { IAsyncState, IRootState } from '../../../app/common/interfaces/states';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { listenToSelectedEvent } from '../../../app/store/events/eventActions';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

interface IEventDetailedPageParams {
  id: string;
}

interface IEventDetailedPageProps
  extends RouteComponentProps<IEventDetailedPageParams> {}

const EventDetailedPage: React.FC<IEventDetailedPageProps> = ({ match }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector<IRootState, any>(
    (state) => state.auth.currentUser
  );
  const event = useSelector<IRootState, IEvent | null>((state) =>
    state.event.selectedEvent
  );

  const { error, isLoading } = useSelector<IRootState, IAsyncState>(
    (state) => state.async
  );
  const isHost: boolean = !!(event?.hostUid === currentUser?.uid);
  const isGoing: boolean = !!event?.attendeeIds.some(
    (a) => a === currentUser?.uid
  );

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event: any) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  return isLoading || (!event && !error) ? (
    <LoadingComponent content='Loading event ...' />
  ) : error ? (
    <Redirect to={ERROR_PAGE_ROUTE} />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={event!!}
          isHost={isHost}
          isGoing={isGoing}
        />
        <EventDetailedInfo event={event!!} />
        <EventDetailedChat eventId={event!!.id}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendess={event?.attendees!!} hostUid={event?.hostUid || ''}/>
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailedPage;
