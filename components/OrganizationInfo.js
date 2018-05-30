import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { createOrganizationRequestOnServer } from '../store';

class OrganizationInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('organization').name
    }
  }

  render() {
    const { user, organization, ownRequest } = this.props;
    return (
      <ScrollView>
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
          !ownRequest ? (
            <Button
              raised
              buttonStyle={{ backgroundColor: 'skyblue', borderRadius: 10, marginTop: 15 }}
              title='Request to Join'
              onPress={() => {
                // console.log({ userId: user.id, organizationId: organization.id })
                this.props.createOrganizationRequest({ userId: user.id, organizationId: organization.id })
              }}
            />
          ) : (
            ownRequest.status === 'pending' ? (
            <Button
              raised
              buttonStyle={{ backgroundColor: 'green', borderRadius: 10, marginTop: 15 }}
              title='Request Pending'
              onPress={() => console.log('this will check in a user')}
              disabled={true}
            />
            ) : (
              <Button
                raised
                buttonStyle={{ backgroundColor: 'green', borderRadius: 10, marginTop: 15 }}
                title='Check In'
                onPress={() => console.log('this will check in a user')}
              />
            )

          )
        }
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
  console.log(ownRequest)
  return {
    user,
    ownRequest,
    organization,
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
