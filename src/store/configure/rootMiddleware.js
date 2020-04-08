import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {globals} from '../globals';
//import logger from 'redux-logger';

export const sagaMiddleware = createSagaMiddleware();

export default applyMiddleware(
  routerMiddleware(globals.history),
  sagaMiddleware,
  //logger,
);

