import React from 'react';
import { View, Image, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { signup } from '../../../store';
import SignUpForm from './SignUpForm';

class SignUp extends React.Component {
  static navigationOptions = {
    headerMode: 'none'
  }

  constructor() {
    super();
    this.signup = this.signup.bind(this);
  }

  signup(userInfo) {
    this.props.signup(userInfo);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='position' style={ styles.container }>
        <View style={ styles.logoContainer }>
          <Image source={require('../../../assets/images/logo.png')} style={ styles.logo } />
          <Text style={ styles.title }>Partner with your next training buddy, instructor, and more.</Text>
        </View>
        <View style={ styles.formContainer }>
          <SignUpForm signup={ this.signup } navigation={ this.props.navigation } />
        </View>
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
    height: 200,
    width: 200
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  },
  formContainer: {
    width: 300
  }
});

const mapState = null;
const mapDispatch = (dispatch, { navigation }) => ({
  signup(userInfo) {
    dispatch(signup(userInfo, navigation));
  }
});

export default connect(mapState, mapDispatch)(SignUp);
