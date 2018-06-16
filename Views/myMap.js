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

import agencyServiceGroups from '../Agency_ServiceGroup'

const NUMBER_OF_ELEMENTS_TO_LOAD = 15;

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

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
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      await this._getLocationAsync();
    }

    const testData = [...agencyServiceGroups];

    for (let i = 0; i < NUMBER_OF_ELEMENTS_TO_LOAD; i++) {
      const googleMapsURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
        + `?input=${agencyServiceGroups[i].Address1.split(" ").join("%20")}%2C${agencyServiceGroups[i].City}%2C${agencyServiceGroups[i].State}`
        + "&inputtype=textquery"
        + "&fields=geometry"
        + "&key=AIzaSyBSdhGqhspvP_4z1VMTavVSyeTv-uurh_I"
      const googleMapsLocate = await axios.get(googleMapsURL);
      const latandlogData = googleMapsLocate.data.candidates[0]["geometry"]["location"];

      testData[i].staticImage = `http://staticmap.openstreetmap.de/staticmap.php`
        + `?center=${latandlogData["lat"]},${latandlogData["lng"]}`
        + "&zoom=18"
        + "&size=380x250"
        + "&maptype=mapnik"
        + `&markers=${latandlogData["lat"]},${latandlogData["lng"]},`
        + "lightblue1";
      testData[i].latitude = latandlogData["lat"]
      testData[i].longitude = latandlogData["lng"]
      testData[i].currentDistance = distance(latandlogData["lat"], latandlogData["lng"], this.state.location["coords"]["latitude"], this.state.location["coords"]["longitude"]);
      testData[i].key = "" + i;
    }
    for (let i = NUMBER_OF_ELEMENTS_TO_LOAD; i < testData.length; i++) {
      testData[i].key = "" + i;
    }

    const unsorted = testData.splice(0, NUMBER_OF_ELEMENTS_TO_LOAD).map((marker) => (
      <MapView.Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        title={_.startCase(_.toLower(marker.Name))}
        description={marker["Agency Phone1"]+"\n"}
        key={marker.Name}
      />
    ));

    this.setState({
      rowMaps: unsorted,
      objectsLoaded: true,
    },
    )



  }
  componentWillReceiveProps(newProps) {
    this.setState({
      navigation: newProps.navigation.state.params,
    })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

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
            showCallout
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
