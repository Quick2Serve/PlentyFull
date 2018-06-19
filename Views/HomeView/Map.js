import React from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';

export default class Map extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            navigation: props.navigation.state.params,
        }
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
                        title={Name}
                        description={phoneNumber}
                        tracksInfoWindowChanges ={true}
                        showCallout={true}
                    />
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
