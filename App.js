import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import { SelectedHotelsProvider } from "./context/SelectedHotelsContext";

export default function App() {
  return (
    <SelectedHotelsProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SelectedHotelsProvider>
  );
}
