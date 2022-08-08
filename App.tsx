import AppRouter from "./src/navigation/router";
import { observer, Provider } from "mobx-react";
import mainStore from "./src/mobx/mainStore";

import { spy } from "mobx";
import { createMobxDebugger } from "mobx-flipper";
import DropDown from "./src/components/DropDown";
import {
  configureFonts,
  DefaultTheme,
  Portal,
  Provider as PaperProvider,
  Surface,
} from "react-native-paper";
import { useEffect } from "react";
import * as Font from "expo-font";
import { Theme } from "react-native-paper/lib/typescript/types";
import { color } from "react-native-tailwindcss";
// import fontConfig from "./fontConfig";
// import * as SplashScreen from "expo-splash-screen";
// if (__DEV__) {
//   spy(createMobxDebugger(mainStore));
// }

let theme: Theme = {
  ...DefaultTheme,
  roundness: 16,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
    accent: "yellow",
    text: color.black,
    background: color.white,
  },
};
export default function App() {
  // const [loaded, error] = Font.useFonts({
  //   Mont: require("./assets/customFonts/Mont-Regular.ttf"),
  //   MontBold: require("./assets/customFonts/Mont-SemiBold.ttf"),
  //   MontBoldHeavy: require("./assets/customFonts/Mont-Bold.ttf"),
  // });
  // useEffect(() => {
  //   if (!loaded) {
  //     SplashScreen.preventAutoHideAsync();
  //   }
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);
  return (
    <Provider {...mainStore}>
      <PaperProvider theme={theme}>
        <AppRouter />
        <DropDown />
      </PaperProvider>
    </Provider>
  );
}
