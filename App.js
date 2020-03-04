import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import {Ionicons} from '@expo/vector-icons'
import SearchPage from './pages/Search';
import PersonProfile from './pages/PersonProfile';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          headerTitle:"Rate Your Movies",
          headerRight: () => (
          <TouchableHighlight onPress={() => {
            navigation.navigate("Search Page")
          }}>
            <View style={{paddingRight:10}}>
              <Ionicons name="ios-search" size={30}/>
            </View>
          </TouchableHighlight>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}