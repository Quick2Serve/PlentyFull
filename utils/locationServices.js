
import {
  Location,
  Permissions
} from 'expo';

import agencyServiceGroups from '../Agency_ServiceGroup'
import enums from '../utils/enums';

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

  async function getLocationAsync() {
    let errorMessage = null;
    let location = null;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') 
        errorMessage = 'Permission to access location was denied';
    
     location = await Location.getCurrentPositionAsync({});

    return {
      location,
      errorMessage
    }
  }

function sortByDistance(currentLocation) {

    const testData = [...agencyServiceGroups];

    testData.forEach((group, i) => {
      group.current_distance = distance(group.latitude, group.longitude, currentLocation["coords"]["latitude"], currentLocation["coords"]["longitude"]).toFixed(2);
      group.key = "" + i;
    })

    const sorted = testData.sort((a, b) => {
      return a["current_distance"] - b["current_distance"];
    })
    return  sorted.splice(0, enums.NUMBER_OF_ELEMENTS_TO_LOAD);
}

export default {
  sortByDistance,
  getLocationAsync
}