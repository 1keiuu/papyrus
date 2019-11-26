import firebase from "firebase";
import store from "./store";

const config = {
  apiKey: "AIzaSyDSnoEmijXqiwo4YwDRj7CuDYaHqPUKboE",
  authDomain: "papyrus-a8396.firebaseapp.com",
  databaseURL: "https://papyrus-a8396.firebaseio.com",
  projectId: "papyrus-a8396",
  storageBucket: "papyrus-a8396.appspot.com",
  messagingSenderId: "482248426046",
  appId: "1:482248426046:web:1e25f1f84613f01507076f",
  measurementId: "G-8VX41BVLVB"
};

export default {
  init() {
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },
  logout() {
    firebase.auth().signOut();
  },
};
