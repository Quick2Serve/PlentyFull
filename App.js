import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator} from 'react-navigation';
import {HomeView, MapView, Setting} from './Views/index';
import { getTestOrganization } from './database.js';

let promise = getTestOrganization();
promise.then(function(value) {
  console.log(value)
}, function() {
  console.log('failed')
})

const App = createBottomTabNavigator(
  {
    HomeView:{
      screen: HomeView,
      navigationOptions:{
        headerTitle: "List",
      },
    },
    MapView:{
      screen: MapView,
      navigationOptions:{
        headerTitle: "Map",
      },
    },
    Setting:{
      screen: Setting,
      navigationOptions:{
        headerTitle: "Setting",
      },
    }
  }
)

export default App
