import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Portal, FAB } from "react-native-paper";
import { Text } from "react-native";
import { Main } from "./../Views/Main";
import { CardDetails } from "./../components/usersStories/CardDetails";
import { Signup } from "../Views/Signup";
import { Signin } from "../Views/Signin";
import { Loader } from "../Views/Loading";
import { NewStoryDetails } from "../components/newStory/NewStoryDetails";

// import { LoginScreen } from "../Views/LoginScreen";
// import { isAuthenticated } from "../store/reducers/authReducer.js";

const Stack = createNativeStackNavigator();

// <Routes>....</Routes> => Stack.Navigator

const loginRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Sign up" }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ title: "Sign in" }}
      />
    </>
  );
};

const mainRoutes = () => {
  const opt = {
    title: "",
    headerStyle: {
      backgroundColor: "#f7eded",
    },
    headerTintColor: "#2c3e50",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={Main}
      />
      <Stack.Screen options={opt} name="CardDetails" component={CardDetails} />
      <Stack.Screen
        options={opt}
        name="NewStoryDetails"
        component={NewStoryDetails}
      />

      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </>
  );
};

const loadingRoute = () => {
  return (
    <>
      <Stack.Screen
        name="Loading"
        component={Loader}
        options={{ headerShown: false }}
      />
    </>
  );
};

export const Navigation = () => {
  const isSignedIn = useSelector((state) => state.auth.isAuthenticated);
  const isLoaded = useSelector((state) => state.auth.isLoaded);
  const speachActivity = useSelector((state) => state.speach.isActive);

  const dispatch = useDispatch();

  const screenOptions = {
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: "#2c3e50",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  if (!isLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          {loadingRoute()}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (isSignedIn && isLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          {mainRoutes()}
        </Stack.Navigator>
        <Portal>
          <FAB
            visible={speachActivity}
            icon="checkbox-blank"
            style={{
              width: 55,
              height: 55,
              borderRadius: 30,
              backgroundColor: "#ee6e73",
              position: "absolute",
              bottom: 100,
              right: 10,
            }}
            color="white"
            onPress={() => global.speacher.stop()}
          />
        </Portal>
      </NavigationContainer>
    );
  } else if (!isSignedIn && isLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          {loginRoutes()}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <Text>Error</Text>;
  }

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator
  //       screenOptions={screenOptions}
  //     >

  //       {!isLoaded && (

  //       )}
  //       {isSignedIn && isLoaded && (

  //       )}
  //       {!isSignedIn && isLoaded && (

  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
};
