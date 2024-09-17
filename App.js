import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import { SelectedHotelsProvider } from "./context/SelectedHotelsContext";
import { UserProvider } from "./context/UserContext";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <SelectedHotelsProvider>
      <UserProvider>
        <NavigationContainer>
          <StackNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </UserProvider>
    </SelectedHotelsProvider>
  );
}
