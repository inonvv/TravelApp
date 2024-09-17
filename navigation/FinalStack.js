import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DesignerIcon from "../assets/Designer2.png";
import { TouchableOpacity, Image } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import FinalScreen from "../screens/FinalScreen";

const Stack = createNativeStackNavigator();

const FinalStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FinalMain"
        component={FinalScreen}
        options={({ navigation }) => ({
          headerTitle: "Travel App",
          headerTitleAlign: "center",
          headerTransparent: true,
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "lightblue" },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={{ marginRight: 15 }}
            >
              <Image
                source={DesignerIcon}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
          headerStyle: { backgroundColor: "lightblue" },
          headerTitleStyle: { color: "white" },
        }}
      />
    </Stack.Navigator>
  );
};

export default FinalStack;
