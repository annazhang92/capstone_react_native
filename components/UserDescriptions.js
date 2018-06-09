import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

import SubmitDescription from './SubmitDescription';

class UserDescriptions extends Component {
  render() {
    const { orgForms, organization, descriptions, user } = this.props;
    return (
      <View>
        <Text h3>User Descriptions</Text>
        {
          orgForms.map(form => {
            const description = descriptions.find(des => des.userId == user.id && des.organizationId === organization.id && des.formId === form.id)
            return (
              <View key={form.id}>
                <SubmitDescription form={form} organization={organization} description={description}/>
              </View>
            );
          })
        }
      </View>
    );
  }
}

const mapState = ({ user, forms, descriptions }, { navigation }) => {
  const organization = navigation.getParam('organization', 'no organization');
  const orgForms = forms.filter(form => form.organizationId === organization.id);
  return {
    orgForms,
    organization,
    descriptions,
    user
  }
}

export default connect(mapState)(UserDescriptions);
