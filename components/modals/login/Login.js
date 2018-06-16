import React from 'react';
import { View, Image, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { attemptLogin } from '../../../store';
import LoginForm from './LoginForm';

class Login extends React.Component {
  static navigationOptions = {
    headerMode: 'none'
  }

  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  login(credentials) {
    this.props.login(credentials);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='position' style={ styles.container }>
        <View style={ styles.logoContainer }>
          <Image source={require('../../../assets/images/logo.png')} style={ styles.logo } />
          <Text style={ styles.title }>Partner with your next training buddy, instructor, and more.</Text>
        </View>
        <View style={ styles.formContainer }>
          <LoginForm login={ this.login } />
        </View>
        <TouchableOpacity
          style={ styles.buttonContainer }
          onPress={ () => this.props.navigation.navigate('SignUp') }
        >
          <Text style={ styles.buttonText }>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    height: 300
  },
  logo: {
    height: 100,
    width: 100
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 250,
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 30
  },
  formContainer: {
    width: 300
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 0.5,
    borderBottomColor: '#fff',
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff'
  },
});

const mapState = null;
const mapDispatch = (dispatch, { navigation }) => ({
  login(credentials) {
    dispatch(attemptLogin(credentials, navigation));
  }
});

export default connect(mapState, mapDispatch)(Login);
