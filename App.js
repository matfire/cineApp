import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import {Ionicons, EvilIcons} from '@expo/vector-icons'
import SearchPage from './pages/Search';
import PersonProfile from './pages/PersonProfile';
import {Provider as StoreProvider, useSelector} from 'react-redux'
import store from './store/store'
import Profile from './pages/ProfilePage';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <StoreProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          headerTitle:"Rate Your Movies",
          headerRight: () => (
            <View style={{flexDirection:"row"}}>
              <TouchableHighlight onPress={() => {
                navigation.navigate("Search Page")
              }}>
                <View style={{paddingRight:30}}>
                  <Ionicons name="ios-search" size={30}/>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {
                navigation.navigate("Profile Page")
              }}>
                <View style={{paddingRight:10}}>
                  <EvilIcons name="user" size={40} />
                </View>
                </TouchableHighlight>
            </View>
          )
        })}
        />
        <Stack.Screen
        name="Movie Detail"
        component={MovieDetail}
        options={({route}) => ({title: route.params.name})}
        />
        <Stack.Screen
        name="Search Page"
        component={SearchPage}
        options={{title:"Search For A Movie"}}
        />
        <Stack.Screen
        name="Profile Detail"
        component={PersonProfile}
        options={({route}) => ({title: route.params.name})}
        />
        <Stack.Screen
        name="Profile Page"
        options={{title:"Your Profile"}}
        component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </StoreProvider>
  );
}