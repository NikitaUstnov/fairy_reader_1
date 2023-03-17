import { loadStories } from "./../../reducers/storyReducer";
import { firebase } from "../../../../config.js";
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

export const LoadStories = ({ userEmail }) => {
  return async (dispatch) => {
    try {
      const stories = [];
      let storiesIdsi = [];

      const queryUser = query(
        collection(firebase, "users"),
        where("email", "==", userEmail)
      );
      const querySnapshot = await getDocs(queryUser);
      querySnapshot.forEach((document) => {
        let docData = document.data();
        storiesIdsi = docData.favoriteStories;
      });

      const storiesQuery = await getDocs(collection(firebase, "stories"));

      storiesQuery.forEach((document) => {
        let story = document.data();

        if (!story.image.length) {
          story.image.length =
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80";
        }

        if (storiesIdsi.includes(story.id)) {
          stories.push(story);
        }
      });
      dispatch(loadStories(stories));
    } catch (error) {
      console.log(error);
      dispatch(loadStories([]));
    }
  };
};
