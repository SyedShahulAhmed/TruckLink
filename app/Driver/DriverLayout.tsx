import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import DriverHomeScreen from './DriverHomeScreen';

import DriverProfile from './DriverProfile';
import DriverTrucks from './DriverTrucks';
// Create Tab Navigator
const Tab = createBottomTabNavigator();

const DriverLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'My Trucks') iconName = 'truck';
          else if (route.name === 'Profile') iconName = 'user-circle';

          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={focused ? '#1E90FF' : color}
            />
          );
        },
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DriverHomeScreen} />
      <Tab.Screen name="My Trucks" component={DriverTrucks} />
      <Tab.Screen name="Profile" component={DriverProfile} />
    </Tab.Navigator>
  );
};

export default DriverLayout;
