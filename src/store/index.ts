import rootRuducer from './reducers/index';
import { rootEpic } from './epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, combineReducers } from 'redux';

const epicMiddleware = createEpicMiddleware();

const combineRootEpic = combineEpics(...rootEpic);

const store = createStore(combineReducers(rootRuducer), applyMiddleware(epicMiddleware));
epicMiddleware.run(combineRootEpic);
export default store;
