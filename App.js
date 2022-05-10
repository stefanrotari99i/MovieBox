import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainPage } from './src/MainPage'
import { PostPage } from './src/PostPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { ResultPage } from './src/ResultPage';
import {DiscoverPage} from './src/DiscoverPage';
import { PeoplePage } from './src/PeoplePage';
import {SearchPage} from './src/Search/SearchPage'





const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="MainPage"
        component={ MainPage }
        options={
          {
            headerShown: false
          }
        }
      />
      <Stack.Screen 
      name="PostPage" 
      component={ PostPage } 
      options={
        {
          headerShown: false
        }
      }
      />

      <Stack.Screen 
      name="ResultPage" 
      component={ ResultPage } 
      options={
        {
          headerShown: false
        }
      }
      />

      <Stack.Screen 
      name="DiscoverPage" 
      component={ DiscoverPage } 
      options={
        {
          headerShown: false
        }
      }
      />

    <Stack.Screen 
      name="PeoplePage" 
      component={ PeoplePage } 
      options={
        {
          headerShown: false
        }
      }
      />

      <Stack.Screen 
      name="SearchPage" 
      component={ SearchPage } 
      options={
        {
          headerShown: false
        }
      }
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();


const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarActiveTintColor: '#ffb531',
  opacity: .2,
  tabBarInactiveTintColor: '#666666',
  tabBarStyle:{
    backgroundColor:'#fff',
    height: 85,
    borderTopWidth: 0,

  },
};

HomeStackScreen.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'PostPage' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}

export default function App() {

  return (
      <NavigationContainer >
        <Tab.Navigator {...{ screenOptions }} >
          <Tab.Screen name="Home" component={HomeStackScreen} options={({ route }) => ({tabBarLabelStyle: ({ color, size, focused }) => ({fontSize: 13, xfontWeight: '700'}), tabBarIcon: ({ color, size, focused }) => (<Ionicons  name={focused ? "md-grid" : "md-grid-outline"} color={color} size={22} />),})} />
          <Tab.Screen name="Movie" component={ResultPage} options={{tabBarIcon: ({ color, size, focused }) => (<Ionicons  name={focused ? "play-circle" : "play-circle-outline"} color={color} size={22} />),}}  />
          <Tab.Screen name="Search" component={MainPage} options={{tabBarIcon: ({ color, size, focused }) => (<Ionicons  name={focused ? "ios-search-sharp" : "ios-search-outline"} color={color} size={22} />),}}  />
          <Tab.Screen name="Watchlist" component={MainPage} options={{tabBarIcon: ({ color, size, focused }) => (<Ionicons  name={focused ? "md-heart-sharp" : "md-heart-outline"} color={color} size={22} />),}}  />
        </Tab.Navigator>
    </NavigationContainer>
  );
}
