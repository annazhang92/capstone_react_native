import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux'

import { createDescriptionOnServer, updateDescriptionOnServer } from '../store';

class SubmitDescription extends Component {

  constructor(props) {
    super(props);
    const { description } = this.props;
    this.state = {
      name: description ? description.description : ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(name) {
    this.setState({ name })
  }

  onSubmit(name, form, user, organization) {
    const { createDescription, updateDescription, description } = this.props;
    if(description) {
     updateDescription({
        id: description.id,
        userId: user.id,
        description: name,
        organizationId: organization.id,
        formId: form.id
      });
    } else {
    createDescription({
      userId: user.id,
      description: name,
      organizationId: organization.id,
      formId: form.id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { description } = nextProps;
    this.setState({ name: description.description })
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
          value={ name }
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

const mapState = ({ user }, { form, organization, description }) => {
  return { user, form, organization, description }
}

const mapDispatch = dispatch => {
  return {
    createDescription: (description) => dispatch(createDescriptionOnServer(description)),
    updateDescription: (description) => dispatch(updateDescriptionOnServer(description))
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
