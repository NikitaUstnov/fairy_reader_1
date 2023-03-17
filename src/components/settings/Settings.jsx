//import liraries
import { async } from "@firebase/util";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, List, MD3Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authReducer.js";
import { clearStories } from "../../store/reducers/storyReducer.js";

// create a component
export default SettingsView = () => {
  const dispatch = useDispatch();
  const logOut = async () => {
    await AsyncStorage.setItem("useremail", "");
    dispatch(clearStories());
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Button icon="logout" onPress={() => logOut()}>
        Log out
      </Button>
    </View>
    // <List.Section style={styles.container}>
    //   {/* <List.Subheader>Some title</List.Subheader> */}
    //   <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
    //   <List.Item
    //     title="Logout"
    //     left={() => <List.Icon color={MD3Colors.tertiary70} icon="logout" />}
    //     onPress={() => logOut()}
    //   />
    // </List.Section>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 20,
  },
});

//make this component available to the app
