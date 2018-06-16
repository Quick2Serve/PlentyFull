import React from 'react';
import {Text, View, FlatList, Image, Button, TouchableOpacity} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {Card} from 'react-native-elements'
import axios from 'axios';
import agencyServiceGroups from '../Agency_ServiceGroup'

export default class HomeView extends React.Component {

  constructor(props){
    super(props);

    this.state={
      rowMaps: undefined,
      navigate: props.navigation.navigate,
      objectsLoaded: false
    }

  }

async componentWillMount(){
  const testData = [...agencyServiceGroups];
  for(let i =0; i < 15; i++)
  {
    const googleMapsURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    +`?input=${agencyServiceGroups[i].Address1.split(" ").join("%20")}`
    +"&inputtype=textquery"
    +"&fields=geometry"
    +"&key=AIzaSyBm6Snu1lD9P4YxHKHdVwxQ27WhGUmpm_Q"
    const googleMapsLocate = await axios.get(googleMapsURL);
    const latandlogData = googleMapsLocate.data.candidates[0]["geometry"]["location"];

    testData[i].staticImage = `http://staticmap.openstreetmap.de/staticmap.php`
    +`?center=${latandlogData["lat"]},${latandlogData["lng"]}`
    +"&zoom=18"
    +"&size=380x250"
    +"&maptype=mapnik"
    +`&markers=${latandlogData["lat"]},${latandlogData["lng"]},`
    +"lightblue1";
    testData[i].latitude = latandlogData["lat"]
    testData[i].longitude = latandlogData["lng"]
    testData[i].key = "" + i;
  }
  for(let i = 15;i < testData.length;i++) {
    testData[i].key = "" + i;
  }

  console.log(testData.length)
   this.setState({
     rowMaps: testData,
     objectsLoaded: true,
  },
)

 }
  MapObjects(props){

    return(
      
      <Card key={props.item.Location_ID} style={{marginBottom: 10}} title={props.item.Name} loading={false}>
        <TouchableOpacity onPress={()=>this.state.navigate('myMap', { long: props.item.longitude, lati: props.item.latitude })}>
        <Image source={{uri: props.item.staticImage}} style={{width: 380, height: 150}}/>
        <Text> {`Description: ${props.item.DESCRIPTION}`} </Text>
        </TouchableOpacity>
      </Card>
    );
  }

  flatList() {
    return (<FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.rowMaps}
              renderItem={this.MapObjects.bind(this)}
        />);
  }

  loading() {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Loading....</Text>
          </View>);
  }

  render(){
    // this.pullOrgs();

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100, borderStyle: "solid", }}>
        {this.state.objectsLoaded ? this.flatList() : this.loading()}
      </View>
    );
  }
}
