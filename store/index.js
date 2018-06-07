import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import socket from './sockets';
import organizations from './organizations';
import user from './sessions';
import users, { updateUser } from './users';
import organizationRequests, { updateOrganizationRequest } from './organizationRequests';
import userOrganizations from './userOrganizations';
import userRequests from './userRequests';

const middleware = applyMiddleware(thunk);
const reducers = combineReducers({ organizations, user, users, organizationRequests, userOrganizations, userRequests });

const store = createStore(reducers, middleware);

socket.on('updatedOrganizationRequest', organizationRequest => {
  store.dispatch(updateOrganizationRequest(organizationRequest));
});

socket.on('updatedUser', user => {
  store.dispatch(updateUser(user));
});

export default store;
export * from './organizations';
export * from './sessions';
export * from './organizationRequests';
export * from './users';
export * from './userOrganizations';
export * from './userRequests';
