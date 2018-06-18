import agencyServiceGroups from '../Agency_ServiceGroup'
import {
    Platform
} from 'react-native';



function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
async function getLocation() {
let location;

    if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
    } else {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
    }
    return {
        latitude: location["coords"]["latitude"],
        longitude: location["coords"]["longitude"],
    }
}

export default async function getData(NUMBER_OF_ELEMENTS_TO_LOAD,location) {
    return {
        objectsLoaded: true,
        rowMaps: agencyServiceGroups
        .splice(0, NUMBER_OF_ELEMENTS_TO_LOAD)
        .forEach(serviceGroup => {
            serviceGroup["current_distance"] = distance(
                serviceGroup.latitude,
                serviceGroup.longitude,
                location.latitude,
                location.longitude
            )
            .toFixed(2);
        })
    // .sort((serviceGroup1, serviceGroup2) => {
    //   return serviceGroup1["current_distance"] - serviceGroup2["current_distance"];
    // });
    }
}

