import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

import SubmitDescription from './SubmitDescription';

class UserDescriptions extends Component {
  render() {
    const { orgForms } = this.props;
    return (
      <View>
        <Text>User Descriptions</Text>
        {
          orgForms.map(form => (
            <View key={form.id}>
              <SubmitDescription form={form} />
            </View>
          ))
        }
      </View>
    );
  }
}

const mapState = ({ user, description, forms }, { navigation }) => {
  const organization = navigation.getParam('organization', 'no organization');
  const orgForms = forms.filter(form => form.organizationId === organization.id)
  console.log('Org Forms', orgForms, organization)
  return {
    orgForms
  }
}

export default connect(mapState)(UserDescriptions);

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 20,
    borderRadius: 50,
    color: 'black',
    paddingHorizontal: 10
  }
});
