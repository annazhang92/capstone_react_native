import React from 'react';
import { Text, View, ScrollView, Button, AsyncStorage, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getOrganizationsFromServer, getUserFromToken } from '../store';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Choose an Organization!',
    headerMode: 'float'
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
    const { organizations, user } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
          />
        }
      >
        <List>
          {
            organizations.map((organization, index) => (
              <ListItem
                roundAvatar
                avatar={{uri: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'}}
                title={organization.name}
                subtitle={organization.organization_type}
                key={index}
                onPress={() => navigate('Details', { organization })}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

<<<<<<< HEAD
const mapState = state => ({
  organizations: state.organizations,
  user: state.user
=======
const mapState = ({ organizations, user }) => ({
  organizations, user
>>>>>>> revised-requests
});

const mapDispatch = dispatch => ({
  getOrganizations: () => dispatch(getOrganizationsFromServer()),
  getUser: (token) => dispatch(getUserFromToken(token))
});

export default connect(mapState, mapDispatch)(Home);




// import React from 'react';
// import { Text, View, ScrollView, Button, AsyncStorage, RefreshControl } from 'react-native';
// import { List, ListItem } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { getOrganizationsFromServer, getUserFromToken } from '../store';

// class Home extends React.Component {
//   static navigationOptions = {
//     title: 'Choose an Organization!',
//     headerMode: 'float'
//   }

//   constructor() {
//     super();
//     this.state = { refreshing: false }
//     this.onRefresh = this.onRefresh.bind(this);
//   }

//   componentDidMount() {
//     const { user, navigation } = this.props;
//     if(!user.id) {
//       navigation.navigate('Login');
//     }
//   }

//   onRefresh() {
//     this.setState({ refreshing: true })
//     this.props.getOrganizations()
//       .then(() => this.setState({ refreshing: false }))
//   }

//   render() {
//     const { organizations, user, state } = this.props;
//     const { navigate } = this.props.navigation;
//     console.log(state)
//     return (
//       <ScrollView
//         refreshControl={
//           <RefreshControl
//             refreshing={this.state.refreshing}
//             onRefresh={() => this.onRefresh()}
//           />
//         }
//       >
//         <List>
//           {
//             organizations.map((organization, index) => (
//               <ListItem
//                 roundAvatar
//                 avatar={{uri: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'}}
//                 title={organization.name}
//                 subtitle={organization.organization_type}
//                 key={index}
//                 onPress={() => navigate('Details', { organization })}
//               />
//             ))
//           }
//         </List>
//       </ScrollView>

//     );
//   }
// }

// const mapState = state => ({
//   organizations: state.organizations,
//   user: state.user,
//   state: state
// });

// const mapDispatch = dispatch => ({
//   getOrganizations() {
//     dispatch(getOrganizationsFromServer());
//   },
//   getUser(token) {
//     dispatch(getUserFromToken(token));
//   }
// });

// export default connect(mapState, mapDispatch)(Home);

