import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import styles from "./styles";

const FairyButton = ({ text, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
    onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.button, isPressed && styles.buttonPressed]}
      onPress={handlePress}
    >
      <View style={styles.buttonText}>
        <Text>{text}</Text>
        <View
          style={[
            styles.buttonTextAfter,
            isPressed && styles.buttonTextAfterPressed,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FairyButton;

const styles = StyleSheet.create({
  button: {
    fontSize: 24,
    fontFamily: "Times New Roman",
    color: "#fff",
    backgroundColor: "#ff9c00",
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    position: "relative",
  },
  buttonTextAfter: {
    position: "absolute",
    bottom: -5,
    left: "50%",
    width: "60%",
    height: 2,
    backgroundColor: "#fff",
    transform: [{ translateX: -30 }],
  },
  buttonPressed: {
    backgroundColor: "#ff8000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonTextAfterPressed: {
    height: 3,
  },
});
