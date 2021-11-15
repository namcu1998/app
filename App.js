import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Tabs';
import Screen from './screens';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
		initialRouteName="Home"
		screenOptions={{
			headerShown: false
		}}
	  >
    <Stack.Screen
			name="Home"
			component={Tabs}
		/>
		<Stack.Screen
			name="Information"
			component={Screen.InformationScreen}
		/>
		<Stack.Screen
			name="Notification"
			component={Screen.NotificationScreen}
		/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
