import React from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import {
  CREATE_EVENT_PAGE_ROUTE,
  EVENTS_PAGE_ROUTE,
  EVENT_DETAIL_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  MANAGE_EVENT_PAGE_ROUTE,
} from '../constants/routes';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import Page404 from '../Page404/Page404';
import './styles.scss';

function App() {
  const { key } = useLocation();

  return (
    <React.Fragment>
      <Switch>
        <Route exact component={HomePage} path={HOME_PAGE_ROUTE} />
        <Route
          path={'/(.+)'}
          render={() => (
            <>
              <NavBar />
              <Container className='main'>
                <Route
                  exact
                  render={() => <EventDashboard />}
                  path={EVENTS_PAGE_ROUTE}
                />
                <Route
                  component={EventDetailedPage}
                  path={`${EVENT_DETAIL_PAGE_ROUTE}/:id`}
                />
                <Route
                  component={EventForm}
                  key={key}
                  path={[
                    CREATE_EVENT_PAGE_ROUTE,
                    `${MANAGE_EVENT_PAGE_ROUTE}/:id`,
                  ]}
                />
              </Container>
            </>
          )}
        />
        <Route component={Page404} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
