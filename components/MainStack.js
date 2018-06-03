import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Asset, AppLoading } from 'expo';
import { getOrganizationsFromServer, getUserFromToken, getUserOrganizationsFromServer, getUsersFromServer, getUserRequestsFromServer } from '../store';

import Home from './Home.js';
import OrganizationInfo from './OrganizationInfo';
import UserRequests from './UserRequests';
import ModalStack from './modals/ModalStack';

const TabNavigator = createMaterialTopTabNavigator({
  Organizations: {
    screen: Home,
    // navigationOptions: ({ navigation }) => ({
    //   title: 'Home',
    // })
  },
  Requests: UserRequests,
}, {
    headerMode: 'none',
    tabBarOptions: {
      activeTintColor: '#02A4FF',
      inactiveTintColor: 'grey',
      labelStyle: {
        fontSize: 16,
      },
      style: {
        backgroundColor: '#fff',
      }
    },
});

const NavStack = createStackNavigator({
  Home: TabNavigator,
  Details: OrganizationInfo,
}, {
  headerMode: 'screen',
  initialRouteName: 'Home'
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
    const { getUser, getOrganizations, getUserOrganizations, getUsers, getUserRequests } = this.props;
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
  getUserRequests: () => dispatch(getUserRequestsFromServer())
});

export default connect(mapState, mapDispatch)(MainStack);





/*import React from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Asset, AppLoading } from 'expo';
import { getOrganizationsFromServer, getUserFromToken, getOrganizationRequestsFromServer } from '../store';

import Home from './Home.js';
import OrganizationInfo from './OrganizationInfo';
import ModalStack from './modals/ModalStack';

const NavStack = createStackNavigator({
  Home: Home,
  Details: OrganizationInfo,
}, {
  headerMode: 'screen',
  initialRouteName: 'Home'
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
    const { getOrganizations, getUser, getOrganizationRequests } = this.props;
    return Promise.all([
      AsyncStorage.getItem('token')
        .then(token => {
          if (token) {
            return getUser(token);
          }
        }),
      Asset.fromModule(require('../assets/images/logo.png')).downloadAsync(),
      getOrganizations(),
      getOrganizationRequests()
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
  getOrganizationRequests: () => dispatch(getOrganizationRequestsFromServer())
});

export default connect(mapState, mapDispatch)(MainStack);
*/
