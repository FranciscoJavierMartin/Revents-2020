import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import {
  MANAGE_EVENT_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
} from '../../../app/common/constants/routes';
import { IEvent } from '../../../app/common/interfaces/models';
import { format } from 'date-fns';
import { boolean } from 'yup';
import { toast } from 'react-toastify';
import {
  addUserAttendance,
  cancelUserAttendance,
} from '../../../app/api/firestore/firestoreService';

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
  isHost: boolean;
  isGoing: boolean;
}

const EventDetailedHeader: React.FC<IEventDetailedHeaderProps> = ({
  event,
  isHost,
  isGoing,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleUserJoinEvent() {
    setIsLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUserLeaveEvent() {
    setIsLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

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
                <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                <p>
                  Hosted by{' '}
                  <strong>
                    <Link to={`${PROFILE_PAGE_ROUTE}/${event.hostedUid}`}>
                      {event.hostedBy}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment attached='bottom' clearing>
        {!isHost && (
          <>
            {isGoing ? (
              <Button onClick={handleUserLeaveEvent} loading={isLoading}>
                Cancel My Place
              </Button>
            ) : (
              <Button
                onClick={handleUserJoinEvent}
                loading={isLoading}
                color='teal'
              >
                Join this event
              </Button>
            )}
          </>
        )}
        {isHost && (
          <Button
            color='orange'
            floated='right'
            as={Link}
            to={`${MANAGE_EVENT_PAGE_ROUTE}/${event.id}`}
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
