import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

class UserList extends Component {

  render() {
    const { ownUsers } = this.props;
    return (
      <View>
      <Text h4 style={{ textAlign: 'center', marginTop: 20 }}>Checked in Users</Text>
        {
          ownUsers.map(user => (
            <View key={user.id}>
              <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 20 }}>{user.fullName}</Text>
              <Button
                onPress={() => console.log('send request')}
                title='Send Request'
              />
            </View>
          ))
        }
      </View>
    );
  }
}

const mapState = ({ user, users, userOrganizations }, { organization }) => {
  const ownUsers = userOrganizations.reduce((memo, userOrg) => {
    users.forEach(otherUser => {
      if (userOrg.userId === otherUser.id && userOrg.organizationId === organization.id && user.id !== otherUser.id) {
        memo.push(otherUser);
      }
    })
    return memo;
  }, [])
  return {
    ownUsers
  }
}

export default connect(mapState)(UserList)
