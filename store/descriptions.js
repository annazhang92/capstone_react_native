import axios from 'axios';
import productionUrl from './productionUrl';

const GET_DESCRIPTIONS = 'GET_DESCRIPTIONS';
const CREATE_DESCRIPTION = 'CREATE_DESCRIPTION';

const getDescriptions = (descriptions) => ({ type: GET_DESCRIPTIONS, descriptions });
const createDescription = (description) => ({ type: CREATE_DESCRIPTION, description });

export const getDescriptionsFromServer = () => {
  return dispatch => {
    return axios.get(productionUrl + '/api/descriptions')
      .then(result => result.data)
      .then(descriptions => dispatch(getDescriptions(descriptions)))
  }
}

export const createDescriptionOnServer = (description) => {
  return dispatch => {
    return axios.post(productionUrl + '/api/descriptions', description)
      .then(result => result.data)
      .then(description => dispatch(createDescription(description)))
  }
}

const store = (state = [], action) => {
  switch (action.type) {
    case GET_DESCRIPTIONS:
      return action.descriptions;
    case CREATE_DESCRIPTION:
      return [ ...state, action.description ];
    default:
      return state;
  }
}

export default store;
