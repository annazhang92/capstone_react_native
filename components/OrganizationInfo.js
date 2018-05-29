import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

export default class OrganizationInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('organization').name
    }
  }
  render() {
    const organization = this.props.navigation.getParam('organization', 'no organization');
    return (
      <ScrollView>
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
          onPress={() => console.log('this will send a request')}
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
