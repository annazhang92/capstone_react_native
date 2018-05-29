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



/*import axios from 'axios';
import { AsyncStorage } from 'react-native';

const GOT_USER = 'GOT_USER';
const gotUser = user => ({ type: GOT_USER, user });

export const getUserFromToken = token => {
  return dispatch => {
    // return axios.get(`'http://172.16.25.67:3000/api/sessions/${token}`)
    return axios.get(`https://immense-escarpment-58025.herokuapp.com/api/sessions${token}`)
      .then(result => result.data)
      .then(user => {
        console.log('Thunk-User:', user)
        dispatch(gotUser(user));
      })
      .catch(err => {
        AsyncStorage.removeItem('token');
        return err;
      });
  };
};


export const attemptLogin = (credentials, navigation) => {
  // let _token;
  return dispatch => {
    // return axios.post('http://172.16.25.67:3000/api/sessions', credentials)
    return axios.post('https://immense-escarpment-58025.herokuapp.com/api/sessions', credentials)
      .then(result => result.data)
      .then(token => {
        // _token = token;
        AsyncStorage.setItem('token', token);
        dispatch(getUserFromToken(token));
      })
      .then(() => navigation.navigate('Home'))
      .catch(err => {
        AsyncStorage.removeItem('token');
        return err;
      });
      // .then(() => console.log('Attempt Login Thunk Token:', _token))
      // .catch(err => console.log(err))
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
*/
