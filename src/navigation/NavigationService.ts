import {
  NavigationContainerRef,
  ParamListBase,
  StackActions,
} from "@react-navigation/native";
import React, { RefObject } from "react";

export const navigationRef: RefObject<NavigationContainerRef<ParamListBase>> =
  React.createRef<NavigationContainerRef<{}>>();

function navigate(routeName: string, params?: ParamListBase) {
  // if (navigationRef?.current?.isReady()) {
  navigationRef?.current?.navigate(routeName, { ...params });
  // }
}

function goBack() {
  // if (navigationRef?.current?.isReady()) {
  navigationRef?.current?.goBack();
  // }
}
function pop(n: number) {
  navigationRef.current?.dispatch(StackActions.pop(n));
}
function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

function replace(name: string) {
  navigationRef.current?.dispatch(StackActions.replace(name));
}
// add other navigation functions that you need and export them
export default {
  navigate,
  goBack,
  pop,
  popToTop,
  replace,
};
