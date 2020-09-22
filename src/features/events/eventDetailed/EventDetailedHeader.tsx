import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { MANAGE_EVENT_PAGE_ROUTE } from '../../../app/constants/routes';
import { IEvent } from '../../../app/interfaces/models';

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

interface IEventDetailedHeaderProps {
  event: IEvent;
}

const EventDetailedHeader: React.FC<IEventDetailedHeaderProps> = ({
  event,
}) => {
  console.log('Detail', event.id);
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content='Event title'
                  style={{ color: 'white' }}
                />
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment attached='bottom'>
        <Button>Cancel My Place</Button>
        <Button color='teal'>Join this event</Button>
        <Button
          color='orange'
          floated='right'
          as={Link}
          to={`${MANAGE_EVENT_PAGE_ROUTE}/${event.id}`}
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
