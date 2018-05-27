//save this for last--we need to figure out how to get the splash screen to load
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class Splash extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <View>
          <Image source={require('../assets/images/logo.png')} style={ styles.logo } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02a4ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 200,
    width: 200
  }
});
