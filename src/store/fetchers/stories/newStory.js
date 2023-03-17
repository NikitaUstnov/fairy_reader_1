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

export const newStory = async (prompt) => {
  try {
    let request = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + "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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        max_tokens: 3000,
        temperature: 0.8,
        prompt: "write a children's story about " + prompt,
      }),
    });

    // console.log(JSON.stringify(request));
    let response = await request.json();
    // console.log(response.choices[0].text);

    if (response.hasOwnProperty("error")) {
      return false;
    }

    let getImage = await fetch(`http://192.168.31.135:5000?item=${prompt}`);

    let imageres = await getImage.json();

    const storyId = Date.now();
    // let imageres = null;
    let image = imageres.image
      ? imageres.image
      : "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80";

    await addDoc(collection(firebase, "stories"), {
      body: response.choices[0].text,
      title: prompt,
      image,
      id: storyId,
    });

    return {
      id: storyId,
      image,
      title: prompt,
      body: response.choices[0].text,
    };
  } catch (error) {
    console.log("new story error", error);
    return false;
  }
};
