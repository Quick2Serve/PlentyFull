import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { Card, Header } from 'react-native-elements'
import axios from 'axios';
import _ from "lodash";
import {
  Constants,
  Location,
} from 'expo';

import locationServices from '../utils/locationServices';
import enums from '../utils/enums';


export default class HomeView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rowMaps: undefined,
      navigate: props.navigation.navigate,
      location: null,
      errorMessage: null,
      objectsLoaded: false
    }

  }

  async componentWillMount() {
    let locationData = {};
    if (Platform.OS === 'android' && !Constants.isDevice) {
      locationData.errorMessage = 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!';
    }
    else {
      locationData = await locationServices.getLocationAsync();
    }

    this.setState({
      ...locationData,
      rowMaps: locationServices.sortByDistance(locationData.location),
      objectsLoaded: true,
    })

  }

  MapObjects(list) {
    const {
      location_id,
      name,
      longitude,
      latitude,
      description,
      current_distance,
      agency_phone1,
      static_image,
      hours
    } = list.item;

    const mapParms = {
      long: longitude,
      lati: latitude,
      Name: name,
      DESCRIPTION: description,
      current_distance: current_distance,
      phoneNumber: agency_phone1
    }

    return (
      <Card key={location_id} style={{ marginBottom: 10 }} title={name}>
        <TouchableOpacity onPress={() => this.state.navigate('myMap', mapParms)}>
          <Image source={{ uri: static_image }} style={{ width: 310, height: 200, borderWidth: 1, borderColor: '#000000' }} />

          <Text style={styles.yoStyles}><Text style={{ fontWeight: "bold" }}>Distance away: </Text>
            {
              this.state.errorMessage !== 'Permission to access location was denied' && this.state.location && current_distance
                ? current_distance + "miles"
                : "Please check that you have location services enabled."
            }
          </Text>
          <Text style={styles.yoStyles}>
            <Text style={{ fontWeight: "bold" }}>
              Hours:
        </Text>
            {hours ? " " + hours : " No hours provided."}
          </Text>
          <Text style={styles.yoStyles}>
            <Text style={{ fontWeight: "bold" }}>
              Description:
        </Text>
            {description ? " " + description : " No description provided."}
          </Text>

        </TouchableOpacity>
      </Card>
    );
  }

  flatList() {
    return (<FlatList
      style={{ maxWidth: "100%", backgroundColor: "#d3d3d3" }}
      showsVerticalScrollIndicator={false}
      data={this.state.rowMaps}
      renderItem={this.MapObjects.bind(this)}

    />);
  }

  loading() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading....</Text>
      </View>
    );
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{ text: 'PlentyFull', style: { color: '#fff' } }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderStyle: "solid", }}>
          {
            this.state.objectsLoaded
              ? this.flatList()
              : this.loading()
          }
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  maStyles: {
    textAlign: 'center',
    fontSize: 18,
  },
  yoStyles: {
    fontSize: 13,
    paddingLeft: 25
  }
});
