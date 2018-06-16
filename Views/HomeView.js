import React from 'react';
import { Text, View, FlatList} from 'react-native';

export default class HomeView extends React.Component {

  constructor(props){
    super(props);

    this.state={
      rowMaps:[
          {key: 'Devin'},
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
        <Text>{props.item.key}</Text>
      </View>
    );
  }

  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={this.state.rowMaps}
          renderItem={this.MapObjects.bind(this)}
        />
      </View>

    );
  }
}
