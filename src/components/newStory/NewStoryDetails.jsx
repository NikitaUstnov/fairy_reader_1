//import liraries
import React, { useState } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Text, IconButton } from "react-native-paper";
// import * as Speech from "expo-speech";
import { firebase } from "../../../config.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { removeStory, addStory } from "../../store/reducers/storyReducer.js";

// const screenDimensions = Dimensions.get("screen");

const iconHeard = {
  active: "cards-heart",
  inactive: "cards-heart-outline",
};

// create a component
export const NewStoryDetails = ({ route, navigation }) => {
  const { id, title, body, image } = route.params.item;
  const userEmail = useSelector((state) => state.auth.email);
  const speachActivity = useSelector((state) => state.speach.isActive);

  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  const makeLike = async () => {
    like ? setLike(false) : setLike(true);

    const q = query(
      collection(firebase, "users"),
      where("email", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      let docData = document.data();

      if (!like) {
        docData.favoriteStories = [...docData.favoriteStories, id];
        dispatch(addStory({ id, title, body, image }));
      } else {
        docData.favoriteStories = docData.favoriteStories.filter(
          (item) => item !== id
        );
        dispatch(removeStory(id));
      }

      updateDoc(doc(firebase, "users", document.id), docData);
    });
  };

  const play = async () => {
    !speachActivity
      ? global.speacher.play(title + body)
      : global.speacher.stop();
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title=""
        subtitle=""
        left={(props) => (
          <Button onPress={() => play()}>
            {!speachActivity ? "Play" : "Stop"}
          </Button>
        )}
        right={(props) => (
          <IconButton
            {...props}
            icon={like ? iconHeard.active : iconHeard.inactive}
            onPress={() => makeLike()}
          />
        )}
      />
      <ScrollView>
        <Card.Cover
          style={styles.cardImage}
          source={{
            uri: image,
          }}
        />

        <Card.Content>
          <Text style={styles.cardTitle} variant="titleLarge">
            {title}
          </Text>
          <Text variant="bodyMedium">{body}</Text>
        </Card.Content>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    // height: screenDimensions.height - 500,
    backgroundColor: "#f7eded",
    // position: "relative",
    // padding: 10,
    flex: 1,
    // height: "100%",
  },
  cardContent: {
    flex: 1,
    // justifyContent: "space-between",
    // marginTop: 20,
    // height: "100%",
    // overflowY: "auto",
  },
  cardTitle: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
  },

  cardImage: {
    height: 300,
  },
});
