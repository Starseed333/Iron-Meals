// External Dependencies
import { applyMiddleware, createStore, compose } from 'redux';

// Our Dependencies
import reducers from './reducers';
import logger from './utils/logger';

const composeEnhancers = window.__REDUX__DEVTOOLS__EXTENTION__COMPOSE__ || compose

export default createStore (
  reducers,
  composeEnhancers(
    applyMiddleware(logger),
  ),
)