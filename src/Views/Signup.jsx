//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import jwt_decode from "jwt-decode";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
WebBrowser.maybeCompleteAuthSession();

import { TextInput, Button, HelperText, Text } from "react-native-paper";
import { firebase } from "../../config.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loading, login } from "../store/reducers/authReducer.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// GoogleSignin.configure({
//   webClientId:
//     "252131656194-t2kn48qbae0oidkpvlnna5o70n2ss7dr.apps.googleusercontent.com",
// });
// GoogleSignin.configure();

// GoogleSignin.configure({
//   scopes: ["email", "profile"], // what API you want to access on behalf of the user, default is email and profile
//   //   webClientId: "<FROM DEVELOPER CONSOLE>", // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   //   hostedDomain: "", // specifies a hosted domain restriction
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   //   accountName: "", // [Android] specifies an account name on the device that should be used
//   iosClientId:
//     "865164671929-r1eapm0p3utat4b7falu5fth71nbua2d.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   //   googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   //   openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   //   profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
//   androidClientId:
//     "865164671929-a0b67urn3nub1mnl7m9aqctf71861hau.apps.googleusercontent.com",
// });

// create a component
// AIzaSyC82hNPixPP6NC4OBaTyu2AHdofL8I0UPg;
export const Signup = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userExists, setUserExists] = useState(false);

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordAreTheSame, setPasswordAreTheSame] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "865164671929-a0b67urn3nub1mnl7m9aqctf71861hau.apps.googleusercontent.com",
    androidClientId:
      "865164671929-a0b67urn3nub1mnl7m9aqctf71861hau.apps.googleusercontent.com",
    iosClientId:
      "865164671929-r1eapm0p3utat4b7falu5fth71nbua2d.apps.googleusercontent.com",
    scope: ["email", "profile"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  const validatePassword = () => {
    return password.length >= 8;
  };

  const validateSamePasswords = () => {
    return password === confirmPassword;
  };

  const validateEmail = () => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const appleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        console.log("Authentication error");
        return;
      }

      // console.log("auth", credential);

      const authResp = jwt_decode(credential.identityToken);

      // setEmail(authResp.email);
      await appleLogSignIn(authResp.email);
      // signed in
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  const appleLogSignIn = async (appleEmail) => {
    try {
      dispatch(loading(false));

      // const docRefGet = doc(firebase, "users", email);
      const q = query(
        collection(firebase, "users"),
        where("email", "==", appleEmail)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        await AsyncStorage.setItem("useremail", appleEmail);
        dispatch(login(appleEmail));
      } else {
        const docRefPost = await addDoc(collection(firebase, "users"), {
          email: appleEmail,
          password: "appleuser",
          id: Date.now(),
          plain: "free",
          favoriteStories: [],
        });
        console.log("Document written with ID: ", docRefPost.id);
        await AsyncStorage.setItem("useremail", appleEmail);

        dispatch(login(appleEmail));
      }

      dispatch(loading(true));
    } catch (e) {
      console.error("Error adding document: ", e);
      dispatch(loading(true));
    }
  };

  const registation = async () => {
    try {
      dispatch(loading(false));

      // const docRefGet = doc(firebase, "users", email);
      const q = query(
        collection(firebase, "users"),
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.size) {
        setUserExists(true);
        setTimeout(() => {
          setUserExists(false);
        }, 5000);
      } else {
        const docRefPost = await addDoc(collection(firebase, "users"), {
          email: email,
          password: password.length ? password : "appleuser",
          id: Date.now(),
          plain: "free",
          favoriteStories: [],
        });
        console.log("Document written with ID: ", docRefPost.id);
        await AsyncStorage.setItem("useremail", email);
        dispatch(login(email));
      }

      dispatch(loading(true));
    } catch (e) {
      console.error("Error adding document: ", e);
      dispatch(loading(true));
    }
  };

  return (
    <View style={styles.container}>
      {userExists && (
        <Text style={styles.warningText}>User is already exists.</Text>
      )}

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(newText) => setEmail(newText)}
      />
      <HelperText
        style={styles.warningText}
        type="error"
        visible={!validateEmail() && email.length}
      >
        Email address is invalid!
      </HelperText>

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(newText) => setPassword(newText)}
      />

      <HelperText
        style={styles.warningText}
        type="error"
        visible={!validatePassword() && password.length}
      >
        Password must contain 8 characters at least
      </HelperText>

      <TextInput
        placeholder="Confirm password"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(newText) => setConfirmPassword(newText)}
      />

      <HelperText
        style={styles.warningText}
        type="error"
        visible={!validateSamePasswords() && confirmPassword.length}
      >
        Passwords does not match
      </HelperText>

      <Button
        disabled={
          !validateEmail() || !validatePassword() || !validateSamePasswords()
        }
        mode="contained"
        onPress={() => registation()}
      >
        Register
      </Button>

      <View>
        <Text style={styles.delimiterText}>OR</Text>
      </View>

      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.appleButton}
        onPress={() => {
          appleLogin();
        }}
      />
      <View>
        <Button onPress={() => navigation.navigate("Signin")}>Sign in</Button>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  appleButton: {
    width: "80%",
    height: 64,
  },

  input: {
    width: "80%",
    // marginBottom: 20,
  },

  delimiterText: {
    marginTop: 15,
    marginBottom: 15,
    color: "#fff",
  },

  regButton: {
    backgroundColor: "#2c3e50",
    height: 64,
    width: "80%",
  },

  warningText: {
    color: "red",
  },
});
