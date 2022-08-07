import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainWebView from "./src/MainWebView";
import AppRouter from "./src/navigation/router";
import { observer, Provider } from "mobx-react";
import mainStore from "./src/mobx/mainStore";

import { spy } from "mobx";
import { createMobxDebugger } from "mobx-flipper";

if (__DEV__) {
  spy(createMobxDebugger(mainStore));
}
export default function App() {
  return (
    <Provider {...mainStore}>
      <AppRouter />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
