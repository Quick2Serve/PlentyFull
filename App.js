import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavagator} from 'react-navigation';

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
