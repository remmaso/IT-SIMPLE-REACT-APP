import * as firebase from "firebase";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB8RMZFKaj24EJ7U5OLsCtcK86-BbiIJMk",
  authDomain: "alert-rush-274212.firebaseapp.com",
  databaseURL: "https://alert-rush-274212.firebaseio.com",
  projectId: "alert-rush-274212",
  storageBucket: "alert-rush-274212.appspot.com",
  messagingSenderId: "109300301644",
  appId: "1:109300301644:web:78ef2a7dc63a15e27e99e9"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const fireAuth = firebaseApp.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider()

