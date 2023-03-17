//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

// create a component
export const Loader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        animating={true}
        color={MD2Colors.red800}
      />
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
});
