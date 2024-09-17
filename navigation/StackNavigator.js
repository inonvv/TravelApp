import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import SignUpScreen from "../screens/SignUp";
import SettingsScreen from "../screens/SettingsScreen";
import FinalScreen from "../screens/FinalScreen";
import FinalStack from "../navigation/FinalStack";
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Final"
        component={FinalStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
