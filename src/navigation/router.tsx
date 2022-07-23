import React, { useEffect, useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationService, { navigationRef } from "./NavigationService";
import Screens from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import NavigationLeftButton from "./NavigationLeftButton/NavigationLeftButton";
import { colors, t } from "react-native-tailwindcss";

const StackNavigator = createStackNavigator();

function PrimaryNav() {
  return (
    <StackNavigator.Navigator initialRouteName={"MainWebView"}>
      {Screens.map(({ name, component, options }) => {
        return (
          <StackNavigator.Screen
            name={name}
            key={name}
            component={component}
            options={options}
          />
        );
      })}
    </StackNavigator.Navigator>
  );
}

export default function AppRouter() {
  return (
    <NavigationContainer ref={navigationRef}>
      <PrimaryNav />
    </NavigationContainer>
  );
}
