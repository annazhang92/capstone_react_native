import React from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getOrganizationsFromServer } from '../store';

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
            <Text style={{ fontSize: 30, textAlign: 'center' }}>
              {item.name}
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
  }
});

export default connect(mapState, mapDispatch)(Home);


