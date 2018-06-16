import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator} from 'react-navigation';
import {HomeView, myMap, Setting} from './Views/index';
import { getTestOrganization } from './database.js';

let promise = getTestOrganization();
promise.then(function(value) {
  var orgs;
  // value is an array
  let list = value.val();
  list.array.forEach(element => {
    var org;
    org.Address = element["Address1"];
    org.Phone = element["Agency Phone1"];
    org.Description = element["DESCRIPTION"];
    org.Eligibility = element["ELIGIBILITY"];
    org.Hours = element["HOURS"];
    org.Name = element["Name"];
    org.URL = element["URL"];
    org.ZipCode = element["ZIPCode"];
    orgs.push(org);
  });
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
    myMap:{
      screen: myMap,
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
