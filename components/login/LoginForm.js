import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange.bind = this.handleChange.bind(this);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
          onChangeText={ value => this.handleChange('email', value) }
          placeholder='Email Address'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          returnKeyType='next'
          onSubmitEditing={ () => this.passwordInput.focus() }
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={ false }
          style={ styles.input }
        />
        <TextInput
          onChangeText={ value => this.handleChange('password', value) }
          onSubmitEditing={ () => this.props.handleSubmit(this.state) }
          placeholder='Password'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          returnKeyType='go'
          secureTextEntry
          style={ styles.input }
          ref={ input => this.passwordInput = input}
        />
        <TouchableOpacity
          style={ styles.buttonContainer }
          onPress={ () => this.props.handleSubmit(this.state) }
        >
          <Text style={ styles.buttonText }>Login</Text>
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
    borderRadius: 50
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  }
});
