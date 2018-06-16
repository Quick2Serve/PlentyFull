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
import { Card } from 'react-native-elements'
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

    const unsorted = testData.splice(0, NUMBER_OF_ELEMENTS_TO_LOAD);
    const sorted = unsorted.sort((a, b) => {
      return a["currentDistance"] - b["currentDistance"];
    })

    this.setState({
      rowMaps: sorted,
      objectsLoaded: true,
    },
    )

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

  MapObjects(props) {

    return (

      <Card key={props.item.Location_ID} style={{ marginBottom: 10 }} title={props.item.Name}>
        <TouchableOpacity onPress={() => this.state.navigate('myMap', { 
          long: props.item.longitude, 
          lati: props.item.latitude,
          Name: props.item.Name, 
          DESCRIPTION: props.item.DESCRIPTION, 
          currentDistance: props.item.currentDistance,
           phoneNumber: props.item["Agency Phone1"]
          })}>
          <Image source={{ uri: props.item.staticImage }} style={{ width: 310, height: 200, borderWidth: 1, borderColor: '#000000' }} />
          {this.state.errorMessage !== 'Permission to access location was denied' && this.state.location ?
            <Text style={styles.yoStyles}>Distance away: {props.item.currentDistance.toFixed(2)} miles</Text>
            : ""}
          <Text style={styles.yoStyles}>{`Hours: ${props.item.HOURS}`}</Text>
          <Text style={styles.yoStyles}> {`Description: ${props.item.DESCRIPTION}`} </Text>
        </TouchableOpacity>
      </Card>
    );
  }

  flatList() {
    return (<FlatList
      style={{ maxWidth: "100%" }}
      showsVerticalScrollIndicator={false}
      data={this.state.rowMaps}
      renderItem={this.MapObjects.bind(this)}

    />);
  }

  loading() {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading....</Text>
    </View>);
  }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderStyle: "solid", }}>
        {this.state.objectsLoaded ? this.flatList() : this.loading()}
      </View>
    );
  }
}

function firstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();;
}

const styles = StyleSheet.create({
  maStyles: {
    textAlign: 'center',
    fontSize: 18,
    //color: "#ffffff"
  },
  yoStyles: {
    //textAlign: 'center',
    fontSize: 13,
    paddingLeft: 25
    //color: "#ffffff"
  }
});
