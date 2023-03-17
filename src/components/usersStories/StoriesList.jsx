//import liraries
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-native-paper";
import { LoadStories } from "./../../store/fetchers/stories/loadStories";
import { Loader } from "../../Views/Loading.jsx";

const StoriesList = (props) => {
  const { navigation } = props;
  const stories = useSelector((state) => state.stories.usersStories);
  const storiesLoaded = useSelector((state) => state.stories.storiesLoaded);
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  // const [currentPage, setCurrentPage] = useState(1);

  const reloadStories = async () => {
    dispatch(LoadStories({ userEmail }));
  };

  // const handleScrollLoadData = async () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  // useEffect(() => {
  //   dispatch(LoadStories({ userEmail }));
  // }, []);

  const sliceText = (text) =>
    text && text.length ? text.slice(0, 200) + "..." : "";

  return (
    <View style={styles.container}>
      {storiesLoaded && !stories.length && (
        <Text style={styles.notificationMsg}>No favotites stories yet</Text>
      )}
      {!storiesLoaded && !stories.length && (
        <Loader />
        // <View>
        //   <Button
        //     loading={storiesLoaded}
        //     onPress={() => {
        //       reloadStories();
        //     }}
        //   >
        //     Reload
        //   </Button>
        //   <Text>Something went wrong</Text>
        // </View>
      )}
      {storiesLoaded && stories.length > 0 && (
        <FlatList
          // onEndReached={handleScrollLoadData}
          // onEndReachedThreshold={0}
          data={stories}
          style={styles.storiesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CardDetails", { item });
              }}
            >
              <Card key={item.id} mode="contained" style={styles.card}>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Content>
                  <Text style={styles.cardTite} variant="titleLarge">
                    {item.title}
                  </Text>
                  <Text style={styles.cardContent} variant="bodyMedium">
                    {sliceText(item.body)}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
    // <Text>govno</Text>
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

  card: {
    shadowColor: "none",
    backgroundColor: "#fff",
    margin: 5,
  },
  cardTite: {
    fontSize: 15,
    padding: 5,
  },

  cardContent: {
    fontSize: 12,
  },

  storiesList: {
    marginTop: 20,
  },

  notificationMsg: {
    fontSize: 24,
    color: "#fff",
  },
});

//make this component available to the app
export default StoriesList;
