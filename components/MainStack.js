import React from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { getOrganizationsFromServer, getUserFromToken } from '../store';

import Home from './Home.js';
import SignIn from './login/Login';
import OrganizationInfo from './OrganizationInfo';

const RootStack = createStackNavigator({
  Home: Home,
  SignIn: SignIn,
  Details: OrganizationInfo
}, {
  initialRouteName: 'Home'
});

class MainStack extends React.Component {
  componentDidMount() {
    const { getOrganizations, getUser } = this.props;
    getOrganizations();
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          getUser(token);
        }
        console.log('no token')
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <RootStack />
    );
  }
}

const mapState = null;
const mapDispatch = dispatch => ({
  getOrganizations() {
    dispatch(getOrganizationsFromServer());
  },
  getUser(token) {
    dispatch(getUserFromToken(token));
  }
});

export default connect(mapState, mapDispatch)(MainStack);
