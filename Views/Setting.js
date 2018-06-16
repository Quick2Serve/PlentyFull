import React from 'react';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class Setting extends React.Component {
  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
        <Text>Filters Organizations By</Text>
        <CheckBox title="Distance" checked={true} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor='blue'/>
        <CheckBox title="Time" checked={false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor='blue'/>
        <Text>Options</Text>
        <CheckBox title="Enable Push Notifications" checked={true} checkedColor='blue'/>
        <CheckBox title="Night Mode" checked={false} checkedColor='blue'/>
      </View>
    );
  }
}
