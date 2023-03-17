import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { newStory } from "../../store/fetchers/stories/newStory.js";
import { Loader } from "../../Views/Loading.jsx";
import { getRandomTopics } from "../../utils/topics.js";
import { exsistsStory } from "../../store/fetchers/stories/exsistsStory.js";

const NewStory = (props) => {
  const { navigation } = props;
  const [storyLoad, setStoryLoad] = useState(true);
  const [story, setStory] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [topics, setTopics] = useState([]);
  const allTopics = useSelector((state) => state.topics.topicsList);
  // const stList = useSelector((state) => state.stories);

  // let randomTopics = getRandomTopics(8);
  //   console.log(randomTopics);

  useEffect(() => {
    setTopics(getRandomTopics(allTopics, 9));
    console.log("stList", allTopics);
  }, [allTopics]);

  const scrollRerenderTopics = () => {
    setTopics(getRandomTopics(allTopics, 9));
  };

  const createStory = async (topic) => {
    setStoryLoad(false);
    setStory(false);

    let existingStory = await exsistsStory(topic);
    let newstory = !existingStory ? await newStory(topic) : existingStory;

    if (newstory) {
      setStory(newstory);
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

  const ListItem = ({ title }) => {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let bgColor = "#" + randomColor;
    return (
      <Button
        mode="contained"
        style={styles.listItem}
        uppercase={true}
        buttonColor={bgColor}
        onPress={() => createStory(title)}
      >
        {title}
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      {storyLoad && (
        <>
          <FadeInView>
            {allTopics.length > 0 ? (
              <>
                <Text style={styles.headText}>Select a topic from list</Text>
                <SafeAreaView style={styles.safeArea}>
                  <FlatList
                    onScrollEndDrag={() => scrollRerenderTopics()}
                    // onScrollBeginDrag={() => console.log("start")}
                    numColumns={3}
                    horizontal={false}
                    contentContainerStyle={styles.listStyle}
                    data={topics}
                    renderItem={({ item }) => <ListItem title={item} />}
                  />
                </SafeAreaView>
              </>
            ) : (
              <>
                <Loader />
              </>
            )}
          </FadeInView>
        </>
      )}
      {!storyLoad && <Loader />}
      {loadError && <Text style={styles.warningText}>Story load error.</Text>}
    </View>
  );
};

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
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

  safeArea: {
    flex: 1,
  },

  input: {
    width: "90%",

    marginBottom: 20,
    marginTop: 20,
  },

  headText: {
    fontSize: 24,
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
    marginTop: 200,
  },
  warningText: {
    color: "red",
    marginBottom: 20,
  },
  listItem: {
    margin: 3,
  },
  listStyle: {},
});

export default NewStory;
