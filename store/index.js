import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import organizations from './organizations';
import user from './sessions';

const middleware = applyMiddleware(thunk);
const reducers = combineReducers({ organizations, user });

const store = createStore(reducers, middleware);

export default store;
export * from './organizations';
export * from './sessions';
