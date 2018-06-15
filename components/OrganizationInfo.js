import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Image, RefreshControl, Alert } from 'react-native';
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
    loadOrganizationsRequests()
      .then(() => loadUsers())
      .then(() => this.setState({ refreshing: false }))
  }

  checkInUser(user, organization) {
    const { updateUser, descriptionConfirm, ownRequest } = this.props;
    const { id, firstName, lastName, email, password, userStatus } = user;
    if (!descriptionConfirm && ownRequest && ownRequest.status === 'accepted') {
      return Alert.alert('Please fill out your stats before checking in!');
    }
    const updatedUser = { id, firstName, lastName, email, password, userStatus, checkedInId: organization.id }
    if(!descriptionConfirm) return
    updateUser(updatedUser);
  }

  checkOutUser(user) {
    const { updateUser } = this.props;
    const { id, firstName, lastName, email, password, userStatus } = user;
    const updatedUser = { id, firstName, lastName, email, password, userStatus, checkedInId: null }
    updateUser(updatedUser);
  }

  render() {
    const { user, organization, ownRequest, createOrganizationRequest, organizationRequests, descriptionConfirm, checkedIn } = this.props;
    const { onRefresh, checkInUser, checkOutUser } = this;
    return (
      <ScrollView
        style={{ backgroundColor: organization.backgroundColor }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.image}>
          {
            organization.image && (
              <Image
                style={{ width: 400, height: 275 }}
                source={{ uri: organization.image }}
              />
            )
          }
        </View>
        <View style={styles.container}>
          <Text h3 style={[ styles.text, { color: organization.textColor } ]}>
            {organization.name}
          </Text>
          <Text style={[ styles.text, { marginBottom: 20, color: organization.textColor } ]}>
            ({organization.organization_type})
          </Text>
          <Text style={[ styles.text, { fontSize: 20, color: organization.textColor} ]}>
            {organization.contact_phone}
          </Text>
          <Text style={[ styles.text, { color: organization.textColor } ]}>
            {organization.address}
          </Text>
          <Text style={[ styles.text, { color: organization.textColor } ]}>
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
          {
            ownRequest && ownRequest.status === 'accepted' && (
              <Button
                raised
                buttonStyle={{ backgroundColor: 'purple', borderRadius: 10, marginTop: 15 }}
                title={!descriptionConfirm ? 'Add Stats' : 'Edit Stats'}
                onPress={() => this.props.navigation.navigate('Descriptions', { organization })}
              />
            )
          }
          { user.checkedInId && user.checkedInId === organization.id && <UserList organization={organization} navigation={ this.props.navigation } /> }
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
  const checkedIn = !!user.checkedInId
  return {
    user,
    ownRequest,
    organization,
    organizationRequests,
    descriptionConfirm,
    checkedIn
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
