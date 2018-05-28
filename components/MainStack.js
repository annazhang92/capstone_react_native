import React from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Asset, AppLoading } from 'expo';
import { getOrganizationsFromServer, getUserFromToken } from '../store';

import Home from './Home.js';
import Login from './login/Login';
import OrganizationInfo from './OrganizationInfo';

const RootStack = createStackNavigator({
  Home: Home,
  Login: {
    screen: Login,
    navigationOptions: {
      headerMode: 'none'
    }
  },
  Details: OrganizationInfo
}, {
  initialRouteName: 'Home'
});

class MainStack extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false
    };
    this.asyncLoad = this.asyncLoad.bind(this);
  }

  asyncLoad() {
    const { getOrganizations, getUser } = this.props;
    return AsyncStorage.getItem('token')
      .then(token => {
        if(token) {
          getUser(token);
        }
      })
      .then(() => Asset.fromModule(
        require('../assets/images/logo.png')
      ).downloadAsync())
      .then(() => getOrganizations());
  }

  render() {
    if(!this.state.ready) {
      return (
        <AppLoading
          startAsync={ this.asyncLoad }
          onFinish={ () => this.setState({ ready: true })}
          onError={ console.warn }
        />
      );
    }
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
