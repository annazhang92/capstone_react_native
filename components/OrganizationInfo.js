import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { createOrganizationRequestOnServer, getOrganizationRequestsFromServer, updateUserOnServer, updateLoggedUser, getUsersFromServer, getOrganizationsFromServer } from '../store';

import UserList from './UserList';

class OrganizationInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('organization').name
    }
  }

  constructor() {
    super();
    this.state = {
      refreshing: false,
      // checkedIn: false,
      // error: ''
    }
    this.onRefresh = this.onRefresh.bind(this);
    this.checkInUser = this.checkInUser.bind(this);
    this.checkOutUser = this.checkOutUser.bind(this);
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  onRefresh() {
    const { loadOrganizationsRequests, loadUsers, loadOrganizations } = this.props;
    this.setState({ refreshing: true })
    // loadUsers()
    loadOrganizationsRequests()
      // .then(() => loadUsers())
      // .then(() => loadOrganizations())
      .then(() => this.setState({ refreshing: false }))
  }

  checkInUser(user, organization) {
    const { updateUser } = this.props;
    const { id, firstName, lastName, email, password, userStatus } = user;
    const updatedUser = { id, firstName, lastName, email, password, userStatus, checkedInId: organization.id }
    // this.setState({ checkedIn: true })
    updateUser(updatedUser);
  }

  checkOutUser(user) {
    const { updateUser } = this.props;
    const { id, firstName, lastName, email, password, userStatus } = user;
    const updatedUser = { id, firstName, lastName, email, password, userStatus, checkedInId: null }
    // this.setState({ checkedIn: false })
    updateUser(updatedUser);
  }

  render() {
    const { user, organization, ownRequest, createOrganizationRequest, organizationRequests } = this.props;
    const { onRefresh, checkInUser, checkOutUser } = this;
    const { checkedIn } = this.state;
    // console.log(user)
    // console.log('Error:', this.state.error)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.image}>
          { organization.image && <Image
            style={{ width: 400, height: 275 }}
            source={{ uri: organization.image }}
          />}
        </View>
        <View style={styles.container}>
          <Text h3 style={styles.text}>
            {organization.name}
          </Text>
          <Text style={[ styles.text, { marginBottom: 20 } ]}>
            ({organization.organization_type})
          </Text>
          <Text style={[ styles.text, { fontSize: 20 } ]}>
            {organization.contact_phone}
          </Text>
          <Text style={styles.text}>
            {organization.address}
          </Text>
          <Text style={styles.text}>
            {organization.city}, {organization.state} {organization.zip}
          </Text>
          {
            !ownRequest && (
              <Button
                raised
                buttonStyle={{ backgroundColor: 'skyblue', borderRadius: 10, marginTop: 15 }}
                title='Request to Join'
                onPress={() => {
                  // const ownRequest = organizationRequests.find(request=> {
                    // return request.userId === user.id && request.organizationId === organization.id
                  // })
                  // console.log('organizationRequests', organizationRequests)
                  // console.log('ownRequest:', ownRequest)
                  // if(ownRequest) {
                  //   return this.setState({ error: 'You have already sent a request to this organization' })
                  // }
                  createOrganizationRequest({ userId: user.id, organizationId: organization.id })
                }}
              />
            )
          }
          {
            ownRequest && ownRequest.status === 'pending' && (
              <Button
                raised
                buttonStyle={{ backgroundColor: 'grey', borderRadius: 10, marginTop: 15 }}
                title='Request Pending'
                onPress={() => console.log('this should not click')}
                disabled={true}
              />
            )
          }
          {
            ownRequest && ownRequest.status === 'accepted' && !user.checkedInId && (
                <Button
                  raised
                  buttonStyle={{ backgroundColor: 'green', borderRadius: 10, marginTop: 15 }}
                  title='Check In'
                  onPress={() => checkInUser(user, organization)}
                />
            )
          }
          {
            ownRequest && ownRequest.status === 'accepted' && user.checkedInId && (
                <Button
                  raised
                  buttonStyle={{ backgroundColor: 'red', borderRadius: 10, marginTop: 15 }}
                  title='Check Out'
                  onPress={() => checkOutUser(user)}
                />
            )
          }
          {
            ownRequest && ownRequest.status === 'declined' && (
              <View>
                <Text style={{ fontSize: 20, marginTop: 20, textAlign: 'center' }}>
                  We're sorry, but you have been declined. Please call the number above or visit the front desk.
                </Text>
              </View>
            )
          }
          { user.checkedInId && <UserList organization={organization} /> }
        </View>
      </ScrollView>
    );
  }
}

const mapState = ({ organizationRequests, user }, { navigation }) => {
  const organization = navigation.getParam('organization', 'no organization');
  const ownRequest = organizationRequests.find(request => {
    return request.userId === user.id && request.organizationId === organization.id
  })
  // console.log(ownRequest)
  return {
    user,
    ownRequest,
    organization,
    organizationRequests
  }
}

const mapDispatch = dispatch => {
  return {
    loadOrganizationsRequests: () => dispatch(getOrganizationRequestsFromServer()),
    createOrganizationRequest: (organizationRequest) => dispatch(createOrganizationRequestOnServer(organizationRequest)),
    updateUser: (user) => {
      dispatch(updateUserOnServer(user))
      dispatch(updateLoggedUser(user))
    },
    loadUsers: () => dispatch(getUsersFromServer()),
    loadOrganizations: () => dispatch(getOrganizationsFromServer())
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  image: {
    flex: 1
  },
  text: {
    textAlign: 'left'
  }
});





/*import React from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { getOrganizationsFromServer, createOrganizationRequestOnServer } from '../store';
import { connect } from 'react-redux';

class OrganizationInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('organization').name
    }
  }

  constructor() {
    super();
    this.state = {
      refreshing: false,
    }
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.setState({ refreshing: true })
    this.props.loadOrganizations()
      .then(() => this.setState({ refreshing: false }))
  }

  render() {
    // console.log(this.state)
    const organization = this.props.navigation.getParam('organization');
    const { createOrganizationRequest, user } = this.props;
    // const { user } = this.state;
    console.log(user)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
          />
        }
      >
        <View style={styles.container}>
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
          <Button
            raised
            buttonStyle={{ backgroundColor: 'green', borderRadius: 10, marginTop: 15 }}
            title='Check In'
            onPress={() => console.log('this will check in a user')}
          />
          <Button
            raised
            buttonStyle={{ backgroundColor: 'skyblue', borderRadius: 10, marginTop: 15 }}
            title='Request to Join'
            onPress={() => createOrganizationRequest({ userId: user.id, organizationId: organization.id })}
            // onPress={() => console.log('this will send a request')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

const mapState = (state) => {
  const organizationRequests = state.organizationRequests
  const user = state.user
  // console.log(state)
  return {
    user,
    organizationRequests
  }
}

const mapDispatch = dispatch => {
  return {
    loadOrganizations: () => dispatch(getOrganizationsFromServer()),
    createOrganizationRequest: (organizationRequest) => dispatch(createOrganizationRequestOnServer(organizationRequest))
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);


*/
