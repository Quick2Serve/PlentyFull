import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getTestOrganization } from './database.js';

let promise = getTestOrganization();
promise.then(function(value) {
  console.log(value)
}, function() {
  console.log('failed')
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
