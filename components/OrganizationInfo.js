import React from 'react';
import { Text, View } from 'react-native';

class OrganizationInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('organization').name
    }
  }
  render() {
    const organization = this.props.navigation.getParam('organization', 'no organization')
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          Gym Details will go here once the models have been updated
        </Text>
      </View>
    );
  }
}

export default OrganizationInfo;


