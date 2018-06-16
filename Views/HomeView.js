import React from 'react';
import {Text, View, FlatList, Image} from 'react-native';

export default class HomeView extends React.Component {

  constructor(props){
    super(props);

    this.state={
      rowMaps:[
          {key: 'Devin', screenshots: 'https://facebook.github.io/react/logo-og.png'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]
    }
  }

  MapObjects(props){
    console.log(props)
    return(
      <View>
        <Image source={{uri: props.item.screenshots}}
          style={{width: 200, height: 200}}/>
        <Text>{props.item.key}</Text>
      </View>
    );
  }

  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100, borderStyle: "solid", }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.rowMaps}
          renderItem={this.MapObjects.bind(this)}
        />
      </View>
    );
  }
}
