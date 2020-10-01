import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Container,
  Header,
  Segment,
  Image,
  Button,
  Icon,
} from 'semantic-ui-react';
import { EVENTS_PAGE_ROUTE } from '../../app/common/constants/routes';

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
        <Button size='huge' inverted as={Link} to={EVENTS_PAGE_ROUTE}>
          Get Started
          <Icon name='arrow right' inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
