import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
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
      <ScrollView>
        <List>
          {
            organizations.map((org, i) => (
              <View>
                <ListItem
                  roundAvatar
                  avatar={{uri: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'}}
                  title={org.name}
                  subtitle={org.organization_type}
                  key={org.id}
                  onPress={() => navigate('Details', { organization: org })}
                />
              </View>
            ))
          }
        </List>
      </ScrollView>

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


