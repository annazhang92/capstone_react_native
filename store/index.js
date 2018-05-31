import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import organizations from './organizations';
import user from './sessions';
import users from './users';
import organizationRequests from './organizationRequests';

const middleware = applyMiddleware(thunk);
const reducers = combineReducers({ organizations, user, users, organizationRequests });

const store = createStore(reducers, middleware);

export default store;
export * from './organizations';
export * from './sessions';
export * from './organizationRequests';
export * from './users';
