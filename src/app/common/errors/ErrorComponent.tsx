import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { EVENTS_PAGE_ROUTE } from '../constants/routes';
import { IRootState } from '../interfaces/states';

const ErrorComponent = () => {
  const error = useSelector<IRootState, any>((state) => state.async.error);
  return (
    <Segment placeholder>
      <Header
        textAlign='center'
        content={error?.message || 'Oops - we have an error'}
      />
      <Button
        as={Link}
        to={EVENTS_PAGE_ROUTE}
        primary
        style={{ marginTop: 20 }}
        content='Return to events page'
      />
    </Segment>
  );
};

export default ErrorComponent;
