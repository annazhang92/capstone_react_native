import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class UserDescriptions extends Component {
  render() {
    const { orgForms } = this.props;
    return (
      <View>
        <Text>User Descriptions</Text>
        {
          orgForms.map(form => (
            <Text key={form.id}>{form.name}</Text>
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
