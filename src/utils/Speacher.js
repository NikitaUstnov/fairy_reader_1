import { setActivity } from "../store/reducers/speacherReducer";
import { store } from "../store/index.js";
import * as Speech from "expo-speech";

class Speacher {
  speacher = Speech;
  voice;

  async voices() {
    return await this.speacher.getAvailableVoicesAsync();
  }

  play(text) {
    this.speacher.speak(text);
    store.dispatch(setActivity(true));
  }
  stop() {
    this.speacher.stop();
    store.dispatch(setActivity(false));
  }
}

export { Speacher };
