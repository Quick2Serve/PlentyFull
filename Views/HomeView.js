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
import {
  Constants,
  Location,
  Permissions
} from 'expo';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { Card, Header } from 'react-native-elements'
import axios from 'axios';
import _ from "lodash";
import getData from '../utils/getData';
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
    var data = getData(15,this.state.location);
    // this.setState({...data})
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
   const {
      agency_phone1,
      location_id,
      name,
      longitude,
      latitude,
      description,
      current_distance,
      staticImage,
      hours
    } = props.item;
    
    const parmsToPass =  {
      long: longitude,
      lati: latitude,
      Name: name,
      DESCRIPTION: description,
      currentDistance: current_distance,
      phoneNumber: agency_phone1
    }

    return (
      <Card key={location_id} style={{ marginBottom: 10 }} title={name} loading={false}>
        <TouchableOpacity onPress={() => this.state.navigate('myMap',parmsToPass)}>
          <Image source={{ uri: staticImage }} style={{ width: 310, height: 200, borderWidth: 1, borderColor: '#000000' }} />
          {
            this.state.errorMessage !== 'Permission to access location was denied'
              && this.state.location
              ? <Text style={styles.yoStyles}>
                <Text style={{ fontWeight: "bold" }}>
                  Distance away:
          </Text>
                {current_distance} miles
          </Text>
              : ""
          }
          <Text style={styles.yoStyles}><Text style={{ fontWeight: "bold" }}>Hours: </Text>{hours}</Text>
          <Text style={styles.yoStyles}><Text style={{ fontWeight: "bold" }}>Description:</Text> {description} </Text>
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
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading....</Text>
    </View>);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{ text: 'PlentyFull', style: { color: '#fff' } }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderStyle: "solid", }}>
          {this.state.objectsLoaded ? this.flatList() : this.loading()}
        </View>
      </View>
    );
  }
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
