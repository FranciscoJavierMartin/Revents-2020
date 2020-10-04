import React from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';
import {
  ACCOUNT_PAGE_ROUTE,
  CREATE_EVENT_PAGE_ROUTE,
  ERROR_PAGE_ROUTE,
  EVENTS_PAGE_ROUTE,
  EVENT_DETAIL_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  MANAGE_EVENT_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
} from '../common/constants/routes';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import Page404 from '../Page404/Page404';
import './styles.scss';
import ErrorComponent from '../common/errors/ErrorComponent';
import LoginPage from '../../features/auth/LoginPage';
import RegisterPage from '../../features/auth/RegisterPage';
import AccountPage from '../../features/auth/AccountPage';

function App() {
  const { key } = useLocation();

  return (
    <React.Fragment>
      <ToastContainer position='bottom-right' hideProgressBar/>
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
                <Route path={LOGIN_PAGE_ROUTE} component={LoginPage}/>
                <Route path={REGISTER_PAGE_ROUTE} component={RegisterPage}/>
                <Route path={ACCOUNT_PAGE_ROUTE} component={AccountPage}/>
                <Route path={ERROR_PAGE_ROUTE} component={ErrorComponent}/>
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
