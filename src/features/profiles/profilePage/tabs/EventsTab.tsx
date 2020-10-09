import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Grid, Header, Tab, Image, TabProps } from 'semantic-ui-react';
import { getUserEventsQuery } from '../../../../app/api/firestore/firestoreService';
import { EVENTS_PAGE_ROUTE } from '../../../../app/common/constants/routes';
import { IEvent } from '../../../../app/common/interfaces/models';
import { IRootState } from '../../../../app/common/interfaces/states';
import useFirestoreCollection from '../../../../app/hooks/useFirestoreCollection';
import { listenToUserEvents } from '../../../../app/store/profile/profileActions';
import { format } from 'date-fns';

interface IEventsTabProps {
  profile: any;
  isCurrentUser: boolean;
}

const EventsTab: React.FC<IEventsTabProps> = ({ profile, isCurrentUser }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<number>(0);
  const events = useSelector<IRootState, IEvent[]>(
    (state) => state.profile.profileEvents
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.async.isLoading
  );

  useFirestoreCollection({
    query: () => getUserEventsQuery(activeTab, profile.id),
    data: (events: IEvent[]) => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab, profile.id],
  });

  const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },
  ];

  return (
    <Tab.Pane loading={isLoading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content='Events' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(e, data: TabProps) =>
              setActiveTab(data.activeIndex as number)
            }
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
            {events.map((event: IEvent) => (
              <Card
                as={Link}
                to={`${EVENTS_PAGE_ROUTE}/${event.id}`}
                key={event.id}
              >
                <Image
                  src={`/assets/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign='center' />
                  <Card.Meta textAlign='center'>
                    <div>{format(event.date, 'dd MMM yyyy')}</div>
                    <div>{format(event.date, 'hh:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default EventsTab;
