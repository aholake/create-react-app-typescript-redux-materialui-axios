import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer, { IRootState } from '../shared/reducers';
import loggerMiddleware from './logger-middleware';
import notificationMiddleware from './notification-middleware';

const defaultMiddlewares = [
  notificationMiddleware,
  thunkMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
];
const composedMiddlewares = (middlewares) => (process.env.NODE_ENV === 'development'
  ? composeWithDevTools(applyMiddleware(...defaultMiddlewares, loggerMiddleware, ...middlewares))
  : compose(applyMiddleware(...defaultMiddlewares, ...middlewares)));

const initialize = (
  initialState?: IRootState, middlewares = [],
) => createStore(rootReducer, initialState, composedMiddlewares(middlewares));

export default initialize;
