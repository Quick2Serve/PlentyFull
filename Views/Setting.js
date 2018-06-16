import React from 'react';
import { View, ScrollView } from 'react-native';
import { Card, CheckBox, SearchBar, List, ListItem, Text, Header } from 'react-native-elements'

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
     <View style={{flex: 1, marginBottom: 20}}>
     <Header
       centerComponent={{ text: 'Setting', style: { color: '#fff' } }}
     />
     <ScrollView>
       <View style={{ flex: 1}}>
         <Text style={{fontSize: 15, paddingLeft: 10, marginTop: 10}}>Filters Organizations By</Text>
         <Card loading={false}>
           <CheckBox title="Distance" checked={true} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor='blue'/>
           <CheckBox title="Time" checked={false} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor='blue'/>
         </Card>
         <Text style={{fontSize: 15, paddingLeft: 10, marginTop: 10}}>Options</Text>
         <Card loading={false}>
           <CheckBox title="Enable Push Notifications" checked={true} checkedColor='blue'/>
           <CheckBox title="Night Mode" checked={false} checkedColor='blue'/>
         </Card>
           <Text style={{fontSize: 15, paddingLeft: 10, marginTop: 10}}>Blacklist Organizations</Text>
         <Card loading={false}>
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
       </Card>
       </View>
     </ScrollView>
     </View>
   );
 }
}

