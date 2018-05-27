import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class OrganizationInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('organization').name
    }
  }
  render() {
    const organization = this.props.navigation.getParam('organization', 'no organization');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 35, textAlign: 'left' }}>
          {organization.name}
        </Text>
        <Text style={{ fontSize: 25, textAlign: 'left', marginBottom: 20 }}>
          ({organization.organization_type})
        </Text>
        <Text style={{ fontSize: 30, textAlign: 'left' }}>
          {organization.address}
        </Text>
        <Text style={{ fontSize: 22, textAlign: 'left' }}>
          {organization.city}, {organization.state} {organization.zip}
        </Text>
        <Text style={{ fontSize: 22, textAlign: 'left' }}>
          {organization.contact_phone}
        </Text>
      </View>
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
  logo: {
    height: 200,
    width: 200
  }
});


