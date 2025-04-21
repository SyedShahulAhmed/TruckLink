import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import UserHomeScreen from "./UserHomeScreen";
import TrucksScreen from "./TrucksScreen";
import FavouriteScreen from "./FavouriteScreen";
import UserProfileScreen from "./UserProfileScreen";
import React from "react";

// Create the tab navigator
const Tab = createBottomTabNavigator();

const UserLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Define icons for each tab
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Trucks") iconName = "truck";
          else if (route.name === "Favourites") iconName = "heart";
          else if (route.name === "Account") iconName = "user";

          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={focused ? "#1E90FF" : color}
            />
          );
        },
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={UserHomeScreen} />
      <Tab.Screen name="Trucks" component={TrucksScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Account" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

export default UserLayout;
