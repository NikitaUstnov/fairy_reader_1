//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { newStory } from "../../store/fetchers/stories/newStory.js";

// create a component
const RandomStory = (props) => {
  const { navigation } = props;
  const [storyLoad, setStoryLoad] = useState(true);
  const [loadError, setLoadError] = useState(false);
  // const userStories = useSelector((state) => state.stories.usersStories);
  const allTopics = useSelector((state) => state.topics.topicsList);
  const storiesListTopics = useSelector(
    (state) => state.stories.usersStories
  ).map((el) => el.title);
  // let topic = getRandomTopics(1);

  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  let bgColor = "#" + randomColor;

  const findUniqTopic = (arr1, arr2) => {
    // if (arr1.length === 0) {
    //   return "";
    //   // return getRandomTopics(arr2, 1);
    // } else {
    //   let str = arr1[0];
    //   if (arr2.includes(str)) {
    //     return findUniqTopic(arr1.slice(1), arr2);
    //   } else {
    //     return str;
    //   }
    // }

    const set2 = new Set(arr2);
    const filteredArr1 = arr1.filter((element) => !set2.has(element));
    return filteredArr1[Math.floor(Math.random() * filteredArr1.length)];
  };

  const createStory = async () => {
    // if (!storyLoad) return;

    // setStoryLoad(false);
    let topic = findUniqTopic(allTopics, storiesListTopics);

    // console.log(topic);
    // return;

    let newstory = await newStory(topic);

    if (newstory) {
      setStoryLoad(true);
      navigation.navigate("NewStoryDetails", { item: newstory });
    } else {
      setLoadError(true);
      setStory(false);
      setTimeout(() => {
        setLoadError(false);
      }, 3000);
    }

    setStoryLoad(true);
  };

  return (
    <View style={styles.container}>
      <Button
        buttonColor={bgColor}
        textColor="#fff"
        loading={!storyLoad}
        mode="contained"
        style={styles.randButton}
        onPress={() => createStory()}
      >
        Get a random story
      </Button>
      {/* <FairyButton text="Press me!" onPress={createStory(topic[0])} /> */}
      {/* <FairyButton /> */}
      {loadError && <Text style={styles.warningText}>Story load error.</Text>}
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

  randButton: {
    width: 200,
    height: 70,
    fontSize: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RandomStory;
