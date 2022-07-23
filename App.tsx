import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainWebView from "./src/MainWebView";
import AppRouter from "./src/navigation/router";

export default function App() {
  return <AppRouter />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
