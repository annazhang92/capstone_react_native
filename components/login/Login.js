import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.logoContainer }>
          <Image source={require('../../assets/images/logo.png')} style={ styles.logo } />
          <Text style={ styles.title }>Partner with your next training buddy, instructor, and more.</Text>
        </View>
        <View style={ styles.formContainer }>

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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 100,
    width: 100
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  },
  input: {

  }
});
