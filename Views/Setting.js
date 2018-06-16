import React from 'react';
import { View } from 'react-native';
import { CheckBox, SearchBar, List, ListItem, Text } from 'react-native-elements'

const list = [
  {
    name: 'Mary Rigg Neighborhood Center',
  },
  {
    name: 'Mid-North Food Pantry',
  },
]

export default class Setting extends React.Component {
  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text h2>Settings</Text>
        <Text h4>Filters Organizations By</Text>
        <CheckBox title="Distance" checked={true} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor='blue'/>
        <CheckBox title="Time" checked={false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor='blue'/>
        <Text h4>Options</Text>
        <CheckBox title="Enable Push Notifications" checked={true} checkedColor='blue'/>
        <CheckBox title="Night Mode" checked={false} checkedColor='blue'/>
        <Text h4>Blacklist Organizations</Text>
        <SearchBar
          lightTheme
          placeholder='Type Here...' />
        <List containerStyle={{marginBottom: 20}}>
        {
          list.map((l, i) => (
            <ListItem
              hideChevron={true}
              key={i}
              title={l.name}
            />
          ))
        }
      </List>
      </View>
    );
  }
}
