import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { IAttendant } from '../../../app/common/interfaces/models';

interface IEventDetailSidebarProps {
  attendess: IAttendant[];
}

const EventDetailedSidebar: React.FC<IEventDetailSidebarProps> = ({
  attendess,
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
            <Item key={attendant.id} style={{ position: 'relative' }}>
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
