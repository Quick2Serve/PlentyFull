import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator} from 'react-navigation';
import {ListView, MapView, Setting} from './Views/index';

const App = createBottomTabNavigator(
  {
    ListView:{
      screen: ListView,
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
