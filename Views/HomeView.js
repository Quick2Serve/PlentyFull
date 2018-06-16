const sample = [{
  "Location_ID": 1049,
  "Agency_Key": "MAIN1049",
  "Name": "CATHOLIC CHARITIES INDIANAPOLIS",
  "BldgLine": "",
  "Address1": "1400 North Meridian Street",
  "Address2": "",
  "City": "Indianapolis",
  "State": "IN",
  "ZIPCode": 46202,
  "County": "Marion",
  "Country": "USA",
  "Confidential": "FALSE",
  "URL": "www.helpcreatehope.org",
  "Record_Owner": "MAIN",
  "Agency Phone1": "(317) 236-1500",
  "Agency Phone2": "(317) 261-3375 - Fax",
  "Agency Phone3": "",
  "Agency Phone4": "",
  "Agency Phone5": "",
  "Agency Phone6": "",
  "Agency Phone7": "",
  "Agency Phone8": "",
  "Agency Phone9": "",
  "Agency Phone10": "",
  "Service_ID": 1323,
  "Program1": "",
  "DESCRIPTION": "Provides food to persons in need. Limited service area.",
  "HOURS": "Mon 1pm and 5pm ET",
  "ELIGIBILITY": "* Living in Marion County\n* With no other resources for food\n* Not used this pantry during the past 30 days",
  "INTAKE PROCEDURE": "Walk in; arrive by 1pm or 5pm on Monday; arriving up to 30 minutes early suggested.",
  "WHAT TO BRING": "Proof of address (such as driver's license, current mail, or utility bill)",
  "SERVICE AREA": "Marion County"
},
{
  "Location_ID": 1128,
  "Agency_Key": "MAIN1128",
  "Name": "VIDA NUEVA UNITED METHODIST CHURCH - CENTRO FAMILIAR",
  "BldgLine": "",
  "Address1": "2801 West Washington Street",
  "Address2": "",
  "City": "Indianapolis",
  "State": "IN",
  "ZIPCode": 46222,
  "County": "Marion",
  "Country": "USA",
  "Confidential": "FALSE",
  "URL": "www.vidanuevaindy.org",
  "Record_Owner": "MAIN",
  "Agency Phone1": "(317) 638-0796",
  "Agency Phone2": "",
  "Agency Phone3": "",
  "Agency Phone4": "",
  "Agency Phone5": "",
  "Agency Phone6": "",
  "Agency Phone7": "",
  "Agency Phone8": "",
  "Agency Phone9": "",
  "Agency Phone10": "",
  "Service_ID": 1410,
  "Program1": "",
  "DESCRIPTION": "Provides nonperishable food to people in need. Limited service area.",
  "HOURS": "Tues 6:15pm-7:15pm ET",
  "ELIGIBILITY": "* Living in Marion County\n* Not used this pantry within past 30 days",
  "INTAKE PROCEDURE": "Walk-in.",
  "WHAT TO BRING": "* Photo ID\n* Proof of address",
  "SERVICE AREA": "Marion County"
}
]

import React from 'react';
import {Text, View, FlatList, Image, Button, TouchableOpacity} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import { getTestOrganization } from '../database.js';
import axios from 'axios';

export default class HomeView extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state={
      rowMaps: undefined,
      navigate: props.navigation.navigate,
      objectsLoaded: false
    }
    
    this.pullOrgs.bind(this)
  }
  
  pullOrgs() {
    let promise = getTestOrganization();

    const promiseFunc = value => {
      var orgs = new Array();
      // value is an array
      let list = value.val();
      for (i = 0;i < list.length; i++) {
        let element = list[i];
        var org = new Object();
        org.Address = element["Address1"];
        org.Phone = element["Agency Phone1"];
        org.Description = element["DESCRIPTION"];
        org.Eligibility = element["ELIGIBILITY"];
        org.Hours = element["HOURS"];
        org.Name = element["Name"];
        org.URL = element["URL"];
        org.ZipCode = element["ZIPCode"];
        org.ID = element["Location_ID"];
        orgs.push({
          "key": org.ID,
          "value": org,
        });
      }

      this.setState({
        objectsLoaded: true,
        rowMaps: orgs,
      })
    }

    promiseFunc.bind(this);

    promise.then(promiseFunc, function() {
      console.log('failed')
    })
  }
async componentWillMount(){
  const testData = [...sample];
  for(let i =0; i < sample.length; i++)
  {
    const googleMapsURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    +`?input=${sample[i].Address1.split(" ").join("%20")}`
    +"&inputtype=textquery"
    +"&fields=geometry"
    +"&key=AIzaSyBm6Snu1lD9P4YxHKHdVwxQ27WhGUmpm_Q"
    const googleMapsLocate = await axios.get(googleMapsURL);
    const latandlogData = googleMapsLocate.data.candidates[0]["geometry"]["location"];

    testData[i].staticImage = `http://staticmap.openstreetmap.de/staticmap.php`
    +`?center=${latandlogData["lat"]},${latandlogData["lng"]}`
    +"&zoom=18"
    +"&size=865x512"
    +"&maptype=mapnik"
    +`&markers=${latandlogData["lat"]},${latandlogData["lng"]},`
    +"lightblue1";
    testData[i].latitude = latandlogData["lat"]
    testData[i].longitude = latandlogData["lng"]
  }

   this.setState({
     sampleData: testData
   })

 }
  MapObjects(props){

    return(
      <View key={props.item.Location_ID} style={{marginBottom: 15}}>
        <TouchableOpacity onPress={()=>this.state.navigate('myMap', { long: props.item.longitude, lati: props.item.latitude })}>
        <Image source={{uri: props.item.staticImage}} style={{width: 380, height: 150}}/>
        <Text> {props.item.Name} </Text>
        <Text> {props.item.DESCRIPTION} </Text>
        </TouchableOpacity>
      </View>
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
    this.pullOrgs();

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100, borderStyle: "solid", }}>
        {this.state.objectsLoaded ? this.flatList() : this.loading()}
      </View>
    );
  }
}

/*

<TouchableOpacity onPress={() =>
  this.state.navigate('MapView', { key: props.item.key })}>
  // <Image source={{uri: props.item.screenshots}}
    // style={{width: 100, height: 100}}/>
  </TouchableOpacity>
  //title="Closest place..."

  */
