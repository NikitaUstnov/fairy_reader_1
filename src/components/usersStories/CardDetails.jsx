//import liraries
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button, Card, Text, IconButton } from "react-native-paper";
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

const iconHeard = {
  active: "cards-heart",
  inactive: "cards-heart-outline",
};

// create a component
export const CardDetails = ({ route, navigation }) => {
  // console.log(screenDimensions);

  const { id, title, body, image } = route.params.item;

  const dispatch = useDispatch();

  const [like, setLike] = useState(true);
  const userEmail = useSelector((state) => state.auth.email);

  const isMounted = useRef(false);

  const speachActivity = useSelector((state) => state.speach.isActive);

  const makeLike = () => {
    like ? setLike(false) : setLike(true);
    if (like) {
      setTimeout(() => {
        navigation.navigate("Main");
      }, 500);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      saveOrRemove(like);
    } else {
      isMounted.current = true;
    }
  }, [like]);

  const saveOrRemove = async (like) => {
    const q = query(
      collection(firebase, "users"),
      where("email", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      let docData = document.data();

      if (like) {
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
      {/* <SafeAreaView> */}
      <ScrollView>
        {/* <View style={styles.cardContent}> */}
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
          {/* <Text variant="bodyMedium">{"Elza  ".repeat(1000)}</Text> */}
        </Card.Content>
        {/* </View> */}
      </ScrollView>

      {/* </SafeAreaView> */}
      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
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
