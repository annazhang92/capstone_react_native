import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { createUserRequestOnServer } from '../store';

class UserList extends Component {

  render() {
    const { loggedUser, ownUsers, createRequest, userRequests } = this.props;
    return (
      <View>
      <Text h4 style={{ textAlign: 'center', marginTop: 20 }}>Pair Up!</Text>
        {
          ownUsers.map(user => {
            const requestSent = !!userRequests.find(request => request.requesterId === loggedUser.id && request.responderId === user.id)
            return (
              <View
                key={user.id}
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 20,
                  margin: 10
                }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>{user.fullName}</Text>
                {
                  <Button
                    onPress={() => createRequest({ requesterId: loggedUser.id, responderId: user.id })}
                    title='Send Request'
                    buttonStyle={{
                      backgroundColor: 'blue',
                      borderRadius: 10,
                      marginTop: 15
                    }}
                    disabled={requestSent}
                  />
                }

              </View>
            )
          })
        }
      </View>
    );
  }
}

const mapState = ({ user, users, userOrganizations, userRequests }, { organization }) => {
  const ownUsers = userOrganizations.reduce((memo, userOrg) => {
    users.forEach(otherUser => {
      if (userOrg.userId === otherUser.id && userOrg.organizationId === organization.id && user.id !== otherUser.id) {
        memo.push(otherUser);
      }
    })
    return memo;
  }, [])
  const loggedUser = user;
  return {
    ownUsers,
    loggedUser,
    userRequests
  }
}

const mapDispatch = (dispatch) => {
  return {
    createRequest: (request) => dispatch(createUserRequestOnServer(request))
  }
}

export default connect(mapState, mapDispatch)(UserList)
