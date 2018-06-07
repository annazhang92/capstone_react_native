import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements'
import { updateUserRequestOnServer } from '../store';

class UserRequests extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   title: `REQUESTS ()`
  // }
  render() {
    const { user, users, receivedRequests, updateUserRequest } = this.props;
    return (
      <View>
        <Text h3 style={{ textAlign: 'center', marginBottom: 20 }}>User Requests</Text>
        {
          receivedRequests.map(request => {
            const { id, requesterId, responderId, organizationId, status } = request;
            const requester = users.find(user => user.id === requesterId)
            return (
              <View
                key={id}
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 20,
                  margin: 10
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: 18 }}>{requester.fullName} wants to Pair Up!</Text>
                <Button
                  raised
                  buttonStyle={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 15 }}
                  title='Accept'
                  disabled={ status === 'accepted' }
                  onPress={ () => updateUserRequest({ id, requesterId, responderId, organizationId, status: 'accepted' }) }
                />
                <Button
                  raised
                  buttonStyle={{ backgroundColor: 'orange', borderRadius: 10, marginTop: 15 }}
                  title='Decline'
                  disabled={ status === 'declined'}
                  onPress={() => updateUserRequest({ id, requesterId, responderId, organizationId, status: 'declined' })}
                />
              </View>
            );
          })
        }
        { !receivedRequests.length && <Text style={{ fontSize: 22, textAlign: 'center' }}>You currently have no requests</Text>}
      </View>
    );
  }
}

const mapState = ({ user, users, userRequests }) => {
  const receivedRequests = userRequests.filter(request => request.responderId === user.id)
  return {
    user,
    users,
    receivedRequests
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUserRequest: (userRequest) => {
      // console.log(userRequest)
      dispatch(updateUserRequestOnServer(userRequest))
    }
  }
}

export default connect(mapState, mapDispatch)(UserRequests);
