import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getOrganizationsFromServer } from '../store';

class Home extends React.Component {
  componentDidMount() {
    this.props.getOrganizations();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { this.props.organizations ?
          this.props.organizations.map(organization => (
            <Text key={ organization.name }>{ organization.name }</Text>
          ))
          :
          null
        }
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


