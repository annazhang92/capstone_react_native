import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class UserDescriptions extends Component {
  render() {
    return (
      <View>
        <Text>User Descriptions</Text>
      </View>
    );
  }
}

const mapState = ({ description, forms }) => {
  return {

  }
}

export default connect(mapState)(UserDescriptions);
