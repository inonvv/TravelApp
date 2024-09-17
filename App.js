import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import { SelectedHotelsProvider } from "./context/SelectedHotelsContext";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <SelectedHotelsProvider>
      <UserProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </UserProvider>
    </SelectedHotelsProvider>
  );
}
