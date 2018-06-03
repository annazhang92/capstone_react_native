import axios from 'axios';

const GET_USER_REQUESTS = 'GET_USER_REQUESTS';
const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';

getUserRequests = (userRequests) => ({ type: GET_USER_REQUESTS, userRequests });
createUserRequest = (userRequest) => ({ type: CREATE_USER_REQUEST, userRequest });
updateUserRequest = (userRequest) => ({ type: UPDATE_USER_REQUEST, userRequest });

export const getUserRequestsFromServer = () => {
  return dispatch => {
    return axios.get('https://immense-escarpment-58025.herokuapp.com/api/userRequests')
      .then(result => result.data)
      .then(userRequests => dispatch(getUserRequests(userRequests)))
  }
}

export const createUserRequestOnServer = (userRequest) => {
  return dispatch => {
    return axios.post('https://immense-escarpment-58025.herokuapp.com/api/userRequests', userRequest)
      .then(result => result.data)
      .then(userRequest => dispatch(createUserRequest(userRequest)))
  }
}

export const updateUserRequestOnServer = (userRequest) => {
  const { id } = userRequest;
  return dispatch => {
    return axios.put(`https://immense-escarpment-58025.herokuapp.com/api/userRequests/${id}`)
      .then(result => result.data)
      .then(userRequest => dispatch(updateUserRequest(userRequest)))
  }
}

const store = (state = [], action) => {
  let userRequests;
  switch (action.type) {
    case GET_USER_REQUESTS:
      return action.userRequests;
    case CREATE_USER_REQUEST:
      return [ ...state, action.userRequest ];
    case UPDATE_USER_REQUEST:
      userRequests = state.filter(request => request.id !== action.userRequest.id);
      return [ ...userRequests, action.userRequest ];
    default:
      return state;
  }
}

export default store;
