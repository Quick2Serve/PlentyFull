import { createBottomTabNavigator} from 'react-navigation';
import {HomeView, myMap, Setting} from './Views/index';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const App = createBottomTabNavigator(
  {
    HomeView:{
      screen: HomeView,
      navigationOptions:{
        headerTitle: "List",
        tabBarIcon: ({tintColor}) => <Ionicons name="md-home" size={32} color={tintColor}/>,
      },
    },
    myMap:{
      screen: myMap,
      navigationOptions:{
        headerTitle: "Map",
        tabBarIcon: ({tintColor}) => <Ionicons name="md-map" size={32} color={tintColor}/>,
      },
    },
    Setting:{
      screen: Setting,
      navigationOptions:{
        headerTitle: "Setting",
        tabBarIcon: ({tintColor}) => <Ionicons name="md-settings" size={32} color={tintColor}/>,
      },
    }
  }
)

export default App
