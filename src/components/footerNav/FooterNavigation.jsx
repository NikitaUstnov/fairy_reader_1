import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import SettingsView from "./../settings/Settings.jsx";
import StoriesList from "./../usersStories/StoriesList.jsx";
import NewStory from "./../newStory/NewStory.jsx";
import RandomStory from "./../randomStory/RandomStory.jsx";

const FooterNavigation = (props) => {
  const { navigation } = props;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "newStory", title: "New story", focusedIcon: "chat-plus" },
    { key: "randStory", title: "Random story", focusedIcon: "album" },

    {
      key: "favStories",
      title: "Favorite stories",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "application-settings",
      unfocusedIcon: "application-settings-outline",
    },
  ]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "favStories":
        return <StoriesList jumpTo={jumpTo} navigation={navigation} />;
      case "settings":
        return <SettingsView jumpTo={jumpTo} />;
      case "randStory":
        return <RandomStory jumpTo={jumpTo} navigation={navigation} />;
      case "newStory":
        return <NewStory jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.nav}
      shifting={true}
      sceneAnimationEnabled={true}
    ></BottomNavigation>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "transparent",
    // height: 50,
  },
  // container: {
  //   // flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#2c3e50",
  //   height: PixelRatio.getPixelSizeForLayoutSize(20),
  //   width: "100%",
  //   position: "absolute",
  //   bottom: 0,
  // },
});

export { FooterNavigation };
