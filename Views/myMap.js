import React from 'react';
import { Text, View } from 'react-native';
import { MapView  } from 'expo';

export default class myMap extends React.Component {
  constructor(props){
    super(props)

    this.state={
      navigation: props.navigation.state.params,
    }
  }

  render(){
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.navigation.lati || 37.78825,
          longitude: this.state.navigation.long || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        <MapView.Marker
          coordinate={{
            latitude: this.state.navigation.lati || 37.78825,
            longitude: this.state.navigation.long || -122.4324, 
          }}
          title={"Haters"}
          description={"Later haters"}
        />
      </MapView>
    );
  }
}
