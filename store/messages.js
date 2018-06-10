import axios from 'axios';
import url from './productionUrl';

const GOT_MESSAGES = 'GOT_MESSAGES';

const gotMessages = messages => ({ type: GOT_MESSAGES, messages });

export const getMessagesFromServer = (user1Id, user2Id) => {
  return dispatch => {
    return axios.get(url + `/api/${user1Id}/${user2Id}`)
      .then(result => result.data)
      .then(messages => dispatch(gotMessages(messages)));
  };
};

export const postMessagesToServer = (text, senderId, user1Id, user2Id) => {
  return dispatch => {
    return axios.post(url + `/api/${user1Id}/${user2Id}`, { text, senderId })
      .then(result => result.data)
      .then(messages => dispatch(gotMessages(messages)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
  case GOT_MESSAGES:
    return action.messages;
  default:
    return state;
  }
};

export default store;
