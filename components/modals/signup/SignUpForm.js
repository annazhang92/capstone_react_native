import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

export default class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userStatus: 'user',
      errors: {}
    };
    this.handleChange.bind = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validators = {
      firstName: value => {
        if(!value) return 'First name is required.';
      },
      lastName: value => {
        if(!value) return 'First name is required.';
      },
      email: value => {
        if(!value) return 'Email address is required.';
      },
      password: value => {
        if(!value) return 'Password is required.';
      }
    };
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if(Object.keys(errors).length) {
      return;
    }
    const { firstName, lastName, email, password, userStatus } = this.state;
    this.props.signup({ firstName, lastName, email, password, userStatus });
  }

  render() {
    const { errors } = this.state;
    return (
      <View style={ styles.container }>
        <Text style={ styles.error }>{ errors.firstName }</Text>
        <TextInput
          onChangeText={ value => this.handleChange('firstName', value) }
          placeholder='First Name'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          returnKeyType='next'
          onSubmitEditing={ () => this.lastNameInput.focus() }
          autoCorrect={ false }
          style={ styles.input }
        />
        <Text style={ styles.error }>{ errors.lastName }</Text>
        <TextInput
          onChangeText={ value => this.handleChange('lastName', value) }
          placeholder='Last Name'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          returnKeyType='next'
          onSubmitEditing={ () => this.emailInput.focus() }
          autoCorrect={ false }
          ref={ input => this.lastNameInput = input }
          style={ styles.input }
        />
        <Text style={ styles.error }>{ errors.email }</Text>
        <TextInput
          onChangeText={ value => this.handleChange('email', value) }
          placeholder='Email Address'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          returnKeyType='next'
          onSubmitEditing={ () => this.passwordInput.focus() }
          keyboardType='email-address'
          ref={ input => this.emailInput = input }
          autoCapitalize='none'
          autoCorrect={ false }
          style={ styles.input }
        />
        <Text style={ styles.error }>{ errors.password }</Text>
        <TextInput
          onChangeText={ value => this.handleChange('password', value) }
          onSubmitEditing={ this.handleSubmit }
          placeholder='Password'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          returnKeyType='go'
          secureTextEntry
          style={ styles.input }
          ref={ input => this.passwordInput = input}
        />
        <TouchableOpacity
          style={ styles.buttonContainer }
          onPress={ this.handleSubmit }
        >
          <Text style={ styles.buttonText }>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    borderRadius: 50,
    color: '#FFFFFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 5
  }
});
