import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Container,
  Header,
  Segment,
  Image,
  Button,
  Icon,
} from 'semantic-ui-react';

interface IHomePageProps extends RouteComponentProps {}

const HomePage: React.FC<IHomePageProps> = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            style={{ marginBottom: 12 }}
          />
          Re-vents
        </Header>
        <Button size='huge' inverted>
          Get Started
          <Icon name='arrow right' inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
