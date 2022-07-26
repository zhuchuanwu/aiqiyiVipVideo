import React from "react";

import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import { RouteProp } from "@react-navigation/native";
import MainWebView from "../MainWebView";
import { View } from "react-native";
import { t } from "react-native-tailwindcss";
import RightButton from "../components/RightButton";
import { dropDownStore } from "../mobx/dropdown.store";

interface ScreenProps {
  name: string;
  component: React.ComponentType<any>;
  children?: React.ComponentType<any>;
  options?:
    | StackNavigationOptions
    | ((props: {
        route: RouteProp<Record<string, object | undefined>, string>;
        navigation: any;
      }) => StackNavigationOptions);
}

const Screens: ScreenProps[] = [
  {
    name: "MainWebView",
    component: MainWebView,
  },
];

export default Screens;
