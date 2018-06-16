import React from 'react';
import { Text, View, ListView} from 'react-native';

export default class HomeView extends React.Component {

  constructor(props){
    super(props)

    this.state={
      rowMaps:[
          "Pikachu"
      ]
    }
  }

  MapObjects(props){
    console.log(props)
    return(
      <View>
        <Text> Hello :) </Text>
      </View>
    );
  }
  render(){
    return (
      <ListView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        dataSource={this.state.rowMaps}
        renderRow={this.MapObjects}
      />

    );
  }
}
