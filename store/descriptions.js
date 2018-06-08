import axios from 'axios';
import productionUrl from './productionUrl';

const GET_DESCRIPTIONS = 'GET_DESCRIPTIONS';

const getDescriptions = (descriptions) => ({ type: GET_DESCRIPTIONS, descriptions })

export const getDescriptionsFromServer = () => {
  return dispatch => {
    return axios.get(productionUrl + '/api/descriptions')
      .then(result => result.data)
      .then(descriptions => dispatch(getDescriptions(descriptions)))
  }
}

const store = (state = [], action) => {
  switch (action.type) {
    case GET_DESCRIPTIONS:
      return action.descriptions;
    default:
      return state;
  }
}

export default store;
