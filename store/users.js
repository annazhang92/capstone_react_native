import axios from 'axios';

const GET_USERS = 'GET_USERS'
const UPDATE_USER = 'UPDATE_USER';

const getUsers = users => ({ type: GET_USERS, users });
const updateUser = user => ({ type: UPDATE_USER, user });

export const getUsersFromServer = () => {
  return dispatch => {
    return axios.get('https://immense-escarpment-58025.herokuapp.com/api/users')
      .then(result => result.data)
      .then(users => dispatch(getUsers(users)))
  }
}

export const updateUserOnServer = (user) => {
  const { id } = user;
  return dispatch => {
    return axios.put(`https://immense-escarpment-58025.herokuapp.com/api/users/${id}`, user)
      .then(result => result.data)
      .then(user => dispatch(updateUser(user)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
  case GET_USERS:
    return action.users;
  case UPDATE_USER:
    return [ ...state, action.user ];
  default:
    return state;
  }
};

export default store;

