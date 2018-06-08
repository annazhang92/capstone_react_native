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
      .then(() => loadUsers())
      // .then(() => loadOrganizations())
      .then(() => this.setState({ refreshing: false }))
  }

  checkInUser(user, organization) {
    const { updateUser, descriptionConfirm } = this.props;
    const { id, firstName, lastName, email, password, userStatus } = user;
    const updatedUser = { id, firstName, lastName, email, password, userStatus, checkedInId: organization.id }
    // this.setState({ checkedIn: true })
    if(!descriptionConfirm) return
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
    const { user, organization, ownRequest, createOrganizationRequest, organizationRequests, descriptionConfirm } = this.props;
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
          { !descriptionConfirm && <Text>Must fill in descriptions!</Text>}

                <Button
                  raised
                  buttonStyle={{ backgroundColor: 'red', borderRadius: 10, marginTop: 15 }}
                  title='Edit Stats'
                  // onPress={() => console.log('edit descriptions')}
                  onPress={() => this.props.navigation.navigate('Descriptions', { organization })}
                />

          { user.checkedInId && user.checkedInId === organization.id && <UserList organization={organization} /> }
        </View>
      </ScrollView>
    );
  }
}

const mapState = ({ organizationRequests, user, forms, descriptions }, { navigation }) => {
  const organization = navigation.getParam('organization', 'no organization');
  const ownRequest = organizationRequests.find(request => {
    return request.userId === user.id && request.organizationId === organization.id
  })
  const ownForms = forms.filter(form => form.organizationId === organization.id)
  const ownDescriptions = descriptions.filter(description => description.userId === user.id && description.organizationId === organization.id)
  const descriptionConfirm = ownForms.length === ownDescriptions.length;
  return {
    user,
    ownRequest,
    organization,
    organizationRequests,
    descriptionConfirm
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
