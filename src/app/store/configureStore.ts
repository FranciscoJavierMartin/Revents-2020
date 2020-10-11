import { verify } from 'crypto';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { verifyAuth } from './auth/authActions';
import rootReducer from './rootReducer';
import { createBrowserHistory } from 'history';

const enhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

export const history = createBrowserHistory();

export function configureStore() {
  const store = createStore(rootReducer(history), enhancers);
  store.dispatch(verifyAuth() as any);
  return store;
}
