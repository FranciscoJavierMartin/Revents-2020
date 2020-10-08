import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Label, Segment } from 'semantic-ui-react';
import { PROFILE_PAGE_ROUTE } from '../../../app/common/constants/routes';
import { IAttendant } from '../../../app/common/interfaces/models';

interface IEventDetailSidebarProps {
  attendess: IAttendant[];
  hostUid: string;
}

const EventDetailedSidebar: React.FC<IEventDetailSidebarProps> = ({
  attendess,
  hostUid,
}) => {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ boder: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendess.length} {attendess.length > 1 ? 'People' : 'Person'} going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendess.map((attendant) => (
            <Item key={attendant.id} style={{ position: 'relative' }} as={Link} to={`${PROFILE_PAGE_ROUTE}/${attendant.id}`}>
              {hostUid === attendant.id && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                  content='Host'
                />
              )}
              <Item.Image
                size='tiny'
                src={attendant.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{attendant.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
};

export default EventDetailedSidebar;
