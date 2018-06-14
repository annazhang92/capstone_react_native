import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Asset, AppLoading } from 'expo';
import { getOrganizationsFromServer, getUserFromToken, getUserOrganizationsFromServer, getUsersFromServer, getUserRequestsFromServer, getOrganizationRequestsFromServer, getFormsFromServer, getDescriptionsFromServer } from '../store';

import Home from './Home.js';
import OrganizationInfo from './OrganizationInfo';
import UserRequests from './UserRequests';
import ModalStack from './modals/ModalStack';
import UserDescriptions from './UserDescriptions';
import Chat from './Chat';
import SearchMap from './SearchMap';

const TabNavigator = createMaterialBottomTabNavigator({
  'My Orgs': {
    screen: Home,
  },
  Requests: {
    screen: UserRequests,
  },
  Find: {
    screen: SearchMap,
  }
}, {
  initialRouteName: 'My Orgs',
  activeTintColor: '#02a4ff',
  inactiveTintColor: '#005d91',
  barStyle: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  }
});

const NavStack = createStackNavigator({
  Home: TabNavigator,
  Details: OrganizationInfo,
  Descriptions: UserDescriptions,
  Chat: Chat,
}, {
  headerMode: 'screen',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
    }
  }
});

const RootStack = createStackNavigator({
  Modals: ModalStack,
  Nav: NavStack
}, {
  initialRouteName: 'Nav',
  headerMode: 'none'
});

class MainStack extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false
    };
    this.asyncLoad = this.asyncLoad.bind(this);
    this.loadApp = this.loadApp.bind(this);
  }

  asyncLoad() {
    const { getUser, getOrganizations, getUserOrganizations, getUsers, getUserRequests, getOrgRequests, getForms, getDescriptions } = this.props;
    return Promise.all([
      AsyncStorage.getItem('token')
        .then(token => {
          if (token) {
            return getUser(token);
          }
        }),
      getOrganizations(),
      getUsers(),
      getUserOrganizations(),
      getUserRequests(),
      getOrgRequests(),
      getForms(),
      getDescriptions(),
      Asset.fromModule(require('../assets/images/logo.png')).downloadAsync()
    ]);
  }

  loadApp() {
    this.setState({ ready: true });
  }

  render() {
    if(!this.state.ready) {
      return (
        <AppLoading
          startAsync={ this.asyncLoad }
          onFinish={ this.loadApp }
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
    return dispatch(getUserFromToken(token));
  },
  getUserOrganizations: () => dispatch(getUserOrganizationsFromServer()),
  getUsers: () => dispatch(getUsersFromServer()),
  getUserRequests: () => dispatch(getUserRequestsFromServer()),
  getOrgRequests: () => dispatch(getOrganizationRequestsFromServer()),
  getForms: () => dispatch(getFormsFromServer()),
  getDescriptions: () => dispatch(getDescriptionsFromServer())
});

export default connect(mapState, mapDispatch)(MainStack);
