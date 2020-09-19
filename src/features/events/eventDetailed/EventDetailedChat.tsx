import React from 'react';
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react';

const EventDetailedChat = () => {
  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src='/assets/user.png' />
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Replay</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          <Form reply>
            <Form.TextArea />
            <Button
              content='Add reply'
              labelPosition='left'
              icon='edit'
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </>
  );
};

export default EventDetailedChat;
