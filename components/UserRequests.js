import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Text, Button, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { updateUserRequestOnServer, deleteUserRequestFromServer } from '../store';

class UserRequests extends Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      tabBarIcon: () => {
        return(
          <View>
            <Icon size={22} name='users' color="#02a4ff" />
            {
              screenProps.requestCount > 0 && (
                <View style={{ left: 20, top: -25, backgroundColor: 'red', borderRadius: 15, width: 20, height: 20}}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                    {screenProps.requestCount}
                  </Text>
                </View>
              )
            }
          </View>
        );
      }
    }
  }

  render() {
    const { user, users, receivedRequests, updateUserRequest, deleteUserRequest } = this.props;
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

                { status === 'pending' &&
                  <View>
                    <Button
                      raised
                      buttonStyle={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 15 }}
                      title='Accept'
                      onPress={ () => updateUserRequest({ id, requesterId, responderId, organizationId, status: 'accepted' }) }
                    />
                    <Button
                      raised
                      buttonStyle={{ backgroundColor: 'orange', borderRadius: 10, marginTop: 15 }}
                      title='Decline'
                      onPress={() => deleteUserRequest(request.id)}
                    />
                  </View>
                }
                {
                  status === 'accepted' && (
                    <Button
                      raised
                      buttonStyle={{ backgroundColor: 'green', borderRadius: 10, marginTop: 15 }}
                      title='Chat'
                      onPress={() => this.props.navigation.navigate('Chat', { receivingUser: requester })}
                    />
                  )
                }

              </View>
            );
          })
        }
        { !receivedRequests.length && <Text style={{ fontSize: 22, textAlign: 'center' }}>You currently have no requests</Text>}
      </View>
    );
  }
}

const mapState = ({ user, users, userRequests }, { navigation }) => {
  const receivedRequests = userRequests.filter(request => request.responderId === user.id)
  const newRequestCount = userRequests.filter(request => request.responderId === user.id && request.status === 'pending').length
  return {
    user,
    users,
    receivedRequests,
    newRequestCount
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUserRequest: (userRequest) => dispatch(updateUserRequestOnServer(userRequest)),
    deleteUserRequest: (id) => dispatch(deleteUserRequestFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(UserRequests);
