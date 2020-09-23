import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const enhancers =
  process.env.NODE_ENV === 'development' ? devToolsEnhancer({}) : undefined;

export function configureStore() {
  return createStore(rootReducer, enhancers);
}
