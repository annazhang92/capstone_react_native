import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux'

import { createDescriptionOnServer } from '../store';

class SubmitDescription extends Component {

  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(name) {
    this.setState({ name })
  }

  onSubmit(name, form, user, organization) {
    const { createDescription } = this.props;
    createDescription({
      userId: user.id,
      description: name,
      organizationId: organization.id,
      formId: form.id
    });
  }

  render() {
    const { form, user, organization } = this.props;
    const { name } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <View
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
          margin: 10
        }}>
        <Text h4>{form.name}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => onChange(name)}
        />
        <Button
          raised
          buttonStyle={{ backgroundColor: 'blue', borderRadius: 10 }}
          title='Submit'
          onPress={ () => onSubmit(name, form, user, organization) }
        />
      </View>
    );
  }
}

const mapState = ({ user }, { form, organization }) => {
  return { user, form, organization }
}

const mapDispatch = dispatch => {
  return {
    createDescription: (description) => dispatch(createDescriptionOnServer(description))
  }
}

export default connect(mapState, mapDispatch)(SubmitDescription);

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 20,
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10
  }
});
