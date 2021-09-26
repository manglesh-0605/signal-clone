import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './screens/Login';
import Register from './screens/Register';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff'
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name='chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
