import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getTestOrganization } from './database.js';
import { TabNavagator} from 'react-navigation';

let promise = getTestOrganization();
promise.then(function(value) {
  console.log(value)
}, function() {
  console.log('failed')
})

const App = TabNaviator(
  {
    ListView:{
      screen: ListView,
      navigationOptions:{
        headerTitle: "List",
      },
    }
    MapView:{
      screen: mapView,
      navigationOptions:{
        headerTitle: "Map",
      },
    }
    Setting{
      screen: setting,
      navigationOptions:{
        headerTitle: "Setting",
      },
    }
  }
)

export default App
