import axios from 'axios';
import { AsyncStorage } from 'react-native';

const GOT_USER = 'GOT_USER';
const gotUser = user => ({ type: GOT_USER, user });

export const attemptLogin = (credentials, navigation) => {
  return dispatch => {
    return axios.post('http://immense-escarpment-58025.herokuapp.com/api/sessions', credentials)
      .then(result => result.data)
      .then(token => {
        AsyncStorage.setItem('token', token);
        dispatch(getUserFromToken(token));
      })
      .then(() => navigation.navigate('Home'))
      .catch(err => {
        AsyncStorage.removeItem('token');
        return err;
      });
  };
};

export const signup = (userInfo, navigation) => {
  return dispatch => {
    return axios.post('http://immense-escarpment-58025.herokuapp.com/api/sessions/signup', userInfo)
      .then(result => result.data)
      .then(token => {
        AsyncStorage.setItem('token', token);
        dispatch(getUserFromToken(token));
      })
      .then(() => navigation.navigate('Home'))
      .catch(err => {
        AsyncStorage.removeItem('token');
        return err;
      });
  };
};

export const getUserFromToken = token => {
  return dispatch => {
    return axios.get(`http://immense-escarpment-58025.herokuapp.com/api/sessions/${token}`)
      .then(result => result.data)
      .then(user => {
        dispatch(gotUser(user));
      })
      .catch(err => {
        AsyncStorage.removeItem('token');
        return err;
      });
  };
};

const store = (state = {}, action) => {
  switch (action.type) {
  case GOT_USER:
    return action.user;
  default:
    return state;
  }
};

export default store;
