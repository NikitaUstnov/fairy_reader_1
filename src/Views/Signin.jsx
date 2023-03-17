//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
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

// create a component
export const Signin = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(true);
  const [incorrectPassword, setincorrectPassword] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [secure, setSecure] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const validateEmail = () => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePassword = () => {
    return password.length >= 8;
  };

  const signin = async () => {
    try {
      dispatch(loading(false));
      const q = query(
        collection(firebase, "users"),
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUserExists(false);

        setTimeout(() => {
          setUserExists(true);
        }, 3000);

        return;
      }

      let userdata = null;

      querySnapshot.forEach((doc) => (userdata = doc.data()));

      if (password !== userdata.password) {
        setincorrectPassword(false);

        setTimeout(() => {
          setincorrectPassword(true);
        }, 3000);

        return;
      }
      await AsyncStorage.setItem("useremail", email);

      dispatch(loading(true));
      dispatch(login(email));

      //   navigation.navigate("Main");
    } catch (error) {
      console.log(error);
      dispatch(loading(true));
    }
  };

  return (
    <View
      style={[
        styles.container,
        isKeyboardVisible ? styles.containerAdditional : {},
      ]}
    >
      {!userExists && (
        <Text style={styles.warningText}>User does not exists.</Text>
      )}
      {!incorrectPassword && (
        <Text style={styles.warningText}>Incorrect password.</Text>
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
        secureTextEntry={secure}
        style={styles.input}
        onChangeText={(newText) => setPassword(newText)}
        right={<TextInput.Icon icon="eye" onPress={() => setSecure(!secure)} />}
      />

      <HelperText
        style={styles.warningText}
        type="error"
        visible={!validatePassword() && password.length}
      >
        Password must contain 8 characters at least
      </HelperText>

      <Button
        disabled={!validateEmail() || !validatePassword()}
        mode="contained"
        onPress={() => signin()}
      >
        Sign in
      </Button>
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
    transition: "all 200ms linear",
  },

  containerAdditional: {
    justifyContent: "flex-start",
    paddingTop: 20,
    transition: "all 200ms linear",
  },
  warningText: {
    color: "red",
  },

  input: {
    width: "80%",
    // marginBottom: 20,
  },
});
