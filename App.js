import React from 'react';
import { Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} >
          <Text>Nav</Text>
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue'}}>
          <Text>Main</Text>
        </View>
        <View style={{flex: 3, backgroundColor: 'steelblue'}}>
          <Text>Footer</Text>
        </View>
      </View>
    );
  }
}
