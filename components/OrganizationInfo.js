import React from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Button } from 'react-native-elements';
import { getOrganizationsFromServer } from '../store';
import { connect } from 'react-redux';

class OrganizationInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('organization').name
    }
  }

  constructor() {
    super();
    this.state = { refreshing: false }
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    console.log('refreshing')
    this.setState({ refreshing: true })
    this.props.loadOrganizations()
      .then(() => this.setState({ refreshing: false }))
  }

  render() {
    console.log(this.state)
    const organization = this.props.navigation.getParam('organization');
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

const mapDispatch = dispatch => {
  return {
    loadOrganizations: () => dispatch(getOrganizationsFromServer())
  }
}

export default connect(null, mapDispatch)(OrganizationInfo);


