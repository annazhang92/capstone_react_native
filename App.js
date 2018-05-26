import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { createStackNavigator } from 'react-navigation';

import Home from './components/Home.js';

const RootStack = createStackNavigator({
  Home: {
    screen: Home
  }
}, {
  initialRouteName: 'Home'
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <RootStack />
      </Provider>
    );
  }
}
