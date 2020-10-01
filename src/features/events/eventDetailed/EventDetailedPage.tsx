import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { NOT_FOUND } from '../../../app/common/constants/routes';
import { IEvent } from '../../../app/common/interfaces/models';
import { IRootState } from '../../../app/common/interfaces/states';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

interface IEventDetailedPageParams {
  id: string;
}

interface IEventDetailedPageProps
  extends RouteComponentProps<IEventDetailedPageParams> {}

const EventDetailedPage: React.FC<IEventDetailedPageProps> = ({
  match,
  history,
}) => {
  const event = useSelector<IRootState, IEvent | undefined>((state) =>
    state.event.events.find((evt) => evt.id === match.params.id)
  );

  if (!event) {
    history.push(NOT_FOUND);
  }

  return event ? (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendess={event.attendees!!} />
      </Grid.Column>
    </Grid>
  ) : null;
};

export default EventDetailedPage;
