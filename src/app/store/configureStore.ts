import { verify } from 'crypto';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { verifyAuth } from './auth/authActions';
import rootReducer from './rootReducer';

const enhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

export function configureStore() {
  const store = createStore(rootReducer, enhancers);
  store.dispatch(verifyAuth());
  return store;
}
