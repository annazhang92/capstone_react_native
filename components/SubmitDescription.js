import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux'

class SubmitDescription extends Component {

  render() {
    const { form } = this.props;
    return (
      <View>
        <Text>{form.name}</Text>
        <TextInput />
        <Button
          title='Submit'
          onPress={() => console.log('submit description')}
        />
      </View>
    );
  }
}

const mapState = (state, { form }) => {
  return { form }
}

export default connect(mapState)(SubmitDescription);
