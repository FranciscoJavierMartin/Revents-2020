import React, { useState } from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';
import { IEvent } from '../../../app/common/interfaces/models';
import { format } from 'date-fns';
import EventDetailedMap from './EventDetailedMap';

interface IEventDetailedInfoProps {
  event: IEvent;
}

const EventDetailedInfo: React.FC<IEventDetailedInfoProps> = ({ event }) => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(event.date, 'MMMM d, yyyy h:mm a')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              color='teal'
              size='tiny'
              content={isMapOpen ? 'Hide map' : 'Show Map'}
              onClick={() => setIsMapOpen(!isMapOpen)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {/*isMapOpen && <EventDetailedMap latLng={event.venue.latLng} />*/}
    </Segment.Group>
  );
};

export default EventDetailedInfo;
