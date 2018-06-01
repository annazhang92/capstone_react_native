import axios from 'axios';

const GET_USER_ORGANIZATIONS = 'GET_USER_ORGANIZATIONS';

const getUserOrganizations = (userOrganizations) => ({ type: GET_USER_ORGANIZATIONS, userOrganizations })

export const getUserOrganizationsFromServer = () => {
  return dispatch => {
    return axios.get('https://immense-escarpment-58025.herokuapp.com/api/userOrganizations')
      .then(result => result.data)
      .then(userOrganizations => dispatch(getUserOrganizations(userOrganizations)))
  }
}

const store = (state = [], action) => {
  switch (action.type) {
    case GET_USER_ORGANIZATIONS:
      return action.userOrganizations;
    default:
      return state;
  }
}

export default store;
