import { createBottomTabNavigator} from 'react-navigation';
import {HomeView, myMap, Setting} from './Views/index';

const App = createBottomTabNavigator(
  {
    HomeView:{
      screen: HomeView,
      navigationOptions:{
        headerTitle: "List",
      },
    },
    myMap:{
      screen: myMap,
      navigationOptions:{
        headerTitle: "Map",
      },
    },
    Setting:{
      screen: Setting,
      navigationOptions:{
        headerTitle: "Setting",
      },
    }
  }
)

export default App
