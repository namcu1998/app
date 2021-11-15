import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Screen from '../screens/index';
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator();
const tabStyle = {
    backgroundColor: 'white',
		borderTopWidth: 0,
	  position: 'absolute',
	  left: 16,
	  right: 16,
	  height: 50,
	  bottom: 10,
	  borderRadius: 15,
  	elevation: 9
}

export default function Tabs() {
  return (
      <Tab.Navigator
		initialRouteName="Analytics"
        screenOptions={({ route }) => ({
		  headerShown: false,
		  tabBarStyle: {...tabStyle},
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const iconSize = 25;

            if (route.name === 'Analytics') {
              iconName = focused
                ? 'analytics-sharp'
                : 'analytics-outline';
                
              return <Icon
                size={iconSize}
                name={iconName}
                type='ionicon'
                color='#517fa4'
              />
            } else if (route.name === 'History') {
              iconName = focused 
                ? 'reader' 
                : 'reader-outline';
                
              return <Icon
                size={iconSize}
                name={iconName}
                type='ionicon'
                color='#517fa4'
              />
            } else {
              iconName = focused 
                ? 'pie-chart' 
                : 'pie-chart-outline';
                
              return <Icon
                size={iconSize}
                name={iconName}
                type='ionicon'
                color='#517fa4'
              />
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <Tab.Screen
			  name="Analytics"
			  component={Screen.HomeScreen}
		  />
		  <Tab.Screen
			  name="History"
			  component={Screen.HistoryScreen}
		  />
		  <Tab.Screen
			  name="Chart"
			  component={Screen.ChartScreen}
		  />
      </Tab.Navigator>
  );
}
