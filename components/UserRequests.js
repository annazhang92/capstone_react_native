import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements'

const UserRequests = ({ user, users, userRequests }) => {
  const receivedRequests = userRequests.filter(request => request.responderId === user.id)
  return (
    <View>
      <Text h3 style={{ textAlign: 'center', marginBottom: 20 }}>User Requests</Text>
      {
        receivedRequests.map(request => {
          const requester = users.find(user => user.id === request.requesterId)
          return (
            <View key={request.id}>
              <Text style={{ textAlign: 'center', fontSize: 18 }}>{requester.fullName} wants to Pair Up!</Text>
             <Button
                raised
                buttonStyle={{ backgroundColor: 'blue', borderRadius: 10, marginTop: 15 }}
                title='Accept'
                onPress={() => console.log('accepted')}
              />
             <Button
                raised
                buttonStyle={{ backgroundColor: 'orange', borderRadius: 10, marginTop: 15 }}
                title='Decline'
                onPress={() => console.log('declined')}
              />
            </View>
          );
        })
      }
    </View>
  );
}

const mapState = ({ user, users, userRequests }) => {
  return {
    user,
    users,
    userRequests
  }
}

export default connect(mapState)(UserRequests);
