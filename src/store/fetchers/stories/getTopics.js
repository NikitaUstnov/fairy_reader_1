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
import { store } from "../../index.js";
import { setTopics } from "../../reducers/topicsReducer";

export const getTopics = async () => {
  try {
    const topics = [];

    const docRefTopics = await getDocs(collection(firebase, "topics"));

    docRefTopics.forEach((doc) => topics.push(doc.data()));
    store.dispatch(setTopics(topics[0].topicsList));
  } catch (error) {
    console.log(error);
  }
};
