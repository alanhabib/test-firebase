import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBf7GCTvPJSE4ES5TWWreyxFvRtPlGQuAo",
  authDomain: "chattproject-a77e4.firebaseapp.com",
  databaseURL: "https://chattproject-a77e4.firebaseio.com",
  projectId: "chattproject-a77e4",
  storageBucket: "chattproject-a77e4.appspot.com",
  messagingSenderId: "736106955802"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
