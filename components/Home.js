import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import { getOrganizationsFromServer, getUserFromToken } from '../store';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Choose an Organization!'
  }
  componentDidMount() {
    this.props.getOrganizations();
  }
  render() {
    const { organizations } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={organizations}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>
              {item.name} ({item.organization_type})
            </Text>
            <Button
              title='Details'
              onPress={() => navigate('Details', { organization: item })}
            />
            </View>
          )}
        />
      </View>
    );
  }
}

const mapState = state => ({
  organizations: state.organizations
});

const mapDispatch = dispatch => ({
  getOrganizations() {
    dispatch(getOrganizationsFromServer());
  },
  getUser(token) {
    dispatch(getUserFromToken(token));
  }
});

export default connect(mapState, mapDispatch)(Home);


