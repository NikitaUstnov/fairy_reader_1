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

export const exsistsStory = async (title) => {
  try {
    let story = null;

    const queryStory = query(
      collection(firebase, "stories"),
      where("title", "==", title)
    );

    const querySnapshot = await getDocs(queryStory);

    if (querySnapshot.empty) {
      return false;
    }

    querySnapshot.forEach((doc) => (story = doc.data()));

    return story;
  } catch (error) {
    console.log(error);
    return false;
  }
};
