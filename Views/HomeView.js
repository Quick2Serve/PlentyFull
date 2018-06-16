import React from 'react';
import {Text, View, FlatList, Image, Button} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import { getTestOrganization } from '../database.js';

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

  MapObjects(props){
     // const { navigate } =this.prop.navigation;
    console.log(props)
    return(
      <View>
        <Button
          title="Closest place..."
          onPress={() =>
            this.state.navigate('MapView', { key: props.item.key })
          }
        />
        <Image source={{uri: props.item.screenshots}}
          style={{width: 200, height: 200}}/>
        <Text>{props.item.key}</Text>
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
