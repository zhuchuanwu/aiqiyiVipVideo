import AppRouter from "./src/navigation/router";
import { observer, Provider } from "mobx-react";
import mainStore from "./src/mobx/mainStore";

import { spy } from "mobx";
import { createMobxDebugger } from "mobx-flipper";

// if (__DEV__) {
//   spy(createMobxDebugger(mainStore));
// }
export default function App() {
  return (
    <Provider {...mainStore}>
      <AppRouter />
    </Provider>
  );
}
