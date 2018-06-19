import { createBottomTabNavigator,createStackNavigator} from 'react-navigation';
import { myMap, Setting} from './Views/index';
import {List, Map} from './Views/HomeView/index';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
const headerStyles = {
    headerTitleStyle: {
        color: '#fff'
    },
    headerStyle: {

        backgroundColor: '#476DC5',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        padding: 15,
        height: 70,
    }
};
const HomeView = createStackNavigator({
    List:{
        screen: List,
        navigationOptions: {
            ...headerStyles,
            title: "PlentyFull",
        }
    },
    Mapper: {
        screen: Map,
        navigationOptions: ( { navigation } ) => {
            // console.log(navigation)
            return {
                ...headerStyles,
                title: `${navigation.state.params.Name.split(' ')[0]}`,
            }},
    }

});

const SettingStack = createStackNavigator({
    Setting:{
        screen: Setting,
        navigationOptions:{
            ...headerStyles,
            title: 'Settings'
        }
    }
})
const App = createBottomTabNavigator(
    {
        Home:{
            screen: HomeView,
            navigationOptions:{
                tabBarIcon: ({tintColor}) => <Ionicons name="md-home" size={32} color={tintColor}/>,
            },
        },
        Map:{
            screen: myMap,
            navigationOptions:{
                tabBarIcon: ({tintColor}) => <Ionicons name="md-map" size={32} color={tintColor}/>,
            },
        },
        Setting:{
            screen: SettingStack,
            navigationOptions:{
                tabBarIcon: ({tintColor}) => <Ionicons name="md-settings" size={32} color={tintColor}/>,
            },
        }
    }
)

export default App
