import { StyleSheet, View, StatusBar } from "react-native";
import { FooterNavigation } from "../components/footerNav/FooterNavigation";
import { Speacher } from "../utils/Speacher.js";
import { LoadStories } from "./../store/fetchers/stories/loadStories";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";
import { getTopics } from "../store/fetchers/stories/getTopics.js";

global.speacher = new Speacher();

export const Main = ({ navigation }) => {
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadStories({ userEmail }));
    getTopics();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style={styles.statusBar} />
      <FooterNavigation navigation={navigation}></FooterNavigation>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
    height: "100%",
    color: "#fff",
  },

  statusBar: {
    height: "20%",
    backgroundColor: "#fff",
  },
});
