import React from 'react';
import { Text, View, Platform } from 'react-native';
import { MapView } from 'expo';
import axios from 'axios';
import _ from "lodash";
import {
  Constants,
  Location,
  Permissions
} from 'expo';
import locationServices from '../utils/locationServices';
import colorServices from '../utils/colorServices';

export default class myMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      location: null,
      errorMessage: null,
      rowMaps: null,
      navigation: props.navigation.state.params,
    }
  }

 async componentWillMount() {
    let locationData = {};
    if (Platform.OS === 'android' && !Constants.isDevice) {
        locationData.errorMessage= 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!';
    } 
    else {
     locationData = await locationServices.getLocationAsync();
    }
    const mapMarkers = locationServices.sortByDistance(locationData.location).map((marker) => (
      <MapView.Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        title={_.startCase(_.toLower(marker.name))}
        description={marker.agency_phone1+"\n"}
        key={marker.name}
        pinColor={colorServices.random()}
      />
    ));
    this.setState({
      ...locationData,
      rowMaps: mapMarkers,
      objectsLoaded: true,
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      navigation: newProps.navigation.state.params,
    })
  }
  render() {

    if (this.state.navigation) {
      const {
        lati,
        long, 
        Name, 
        currentDistance,
        phoneNumber
      } = this.props.navigation.state.params;
      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: lati,
            longitude: long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: lati,
              longitude: long,
            }}
            title={_.startCase(_.toLower(Name))}
            description={phoneNumber}
            tracksInfoWindowChanges ={true}
            showCallout={true}
          />
        </MapView>
      );
    }

    if (this.state.location) {
      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location["coords"]["latitude"],
            longitude: this.state.location["coords"]["longitude"],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >

          { this.state.rowMaps}
        </MapView>
      );
    }
    return (
      <View>
        <Text> page couldn't load </Text>
      </View>
    )
  }
}
