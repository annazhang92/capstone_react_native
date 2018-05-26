import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import organizations from './organizations';
import sessions from './sessions';

const middleware = applyMiddleware(thunk);
const reducers = combineReducers({ organizations, sessions });

const store = createStore(reducers, middleware);

export default store;
export * from './organizations';
export * from './sessions';
