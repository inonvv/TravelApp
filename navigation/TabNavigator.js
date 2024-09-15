// navigation/TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import AboutStack from "./AboutStack";
import MoreDetailsStack from "./MoreDetailsStack";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="SignUp">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="About"
        component={AboutStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MoreDetails"
        component={MoreDetailsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
