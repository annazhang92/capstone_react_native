import React from 'react';
import { Text, View, ScrollView, Button, AsyncStorage, RefreshControl, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getOrganizationsFromServer, getUserFromToken } from '../store';

class Home extends React.Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon size={22} name='map-pin' color="#02a4ff" />
  }

  constructor() {
    super();
    this.state = { refreshing: false }
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { user, navigation } = this.props;
    if(!user.id) {
      navigation.navigate('Login');
    }
  }

  onRefresh() {
    const { getOrganizations } = this.props;
    this.setState({ refreshing: true })
    getOrganizations()
      .then(() => this.setState({ refreshing: false }))
  }

  render() {
    const { myOrgs } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        style={ styles.container }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
          />
        }
      >
        <List
          containerStyle={ styles.list }
        >
          {
            myOrgs.map((organization) => (
              <ListItem
                roundAvatar
                avatar={{uri: organization.avatar || 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'}}
                containerStyle={ styles.listItem }
                title={organization.name}
                subtitle={organization.organization_type}
                key={ organization.id }
                onPress={() => navigate('Details', { organization })}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

const mapState = ({ userOrganizations, organizations, user }) => ({
  myOrgs: userOrganizations.reduce((array, userOrg) => {
    const organization = organizations.find(org => userOrg.userId === user.id && userOrg.organizationId === org.id);
    if(organization) {
      array.push(organization);
    }
    return array;
  }, []),
  user
});

const mapDispatch = dispatch => ({
  getOrganizations: () => dispatch(getOrganizationsFromServer()),
  getUser: (token) => dispatch(getUserFromToken(token))
});

export default connect(mapState, mapDispatch)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#02a4ff'
  },
  list: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#02a4ff'
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: 5
  }
});
