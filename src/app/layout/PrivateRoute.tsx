import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import UnAuthModal from '../../features/auth/UnAuthModal';
import { IRootState } from '../common/interfaces/states';

const PrivateRoute: React.FC<any> = ({
  component: Component,
  prevLocation,
  ...rest
}) => {
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.authenticated
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <UnAuthModal {...props} />
      }
    />
  );
};

export default PrivateRoute;
