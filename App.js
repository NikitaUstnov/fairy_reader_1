import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import React, { useCallback, useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./src/store/index.js";
import { Navigation } from "./src/Navigation/Navigation.jsx";
import { isAuthenticated } from "./src/store/reducers/authReducer.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import * as firebase from "@firebase";
// import { firebaseConfig } from "./config";
// firebase.initializeApp(firebaseConfig);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  const checkauth = useCallback(async () => {
    const jsonValue = await AsyncStorage.getItem("useremail");
    console.log("JV", jsonValue);
    if (jsonValue && jsonValue.length) {
      store.dispatch(isAuthenticated(jsonValue));
    } else {
      await AsyncStorage.setItem("useremail", "");
    }
  }, []);

  useEffect(() => {
    checkauth();
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        {/* <BackgroundImage />
        <BlurBackground> */}
        <Navigation />
        {/* </BlurBackground> */}
      </PaperProvider>
    </StoreProvider>
  );
}
