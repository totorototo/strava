import firebase from "firebase";
import Config from "react-native-config";

export const database = () => {
  let firebaseApp;
  let itemsRef;
  const firebaseConfig = {
    apiKey: Config.FIREBASE_APIKEY,
    authDomain: Config.FIREBASE_AUTHDOMAIN,
    databaseURL: Config.FIREBASE_DATABASEURL,
    storageBucket: Config.FIREBASE_STORAGEBUCKET
  };

  function addListener(callBack) {
    itemsRef.on("value", callBack);
  }

  function removeListener(callBack) {
    itemsRef.on("value", callBack);
  }

  function writeData(value = {}) {
    itemsRef.push({ value }.then(data => ({ data }), error => ({ error })));
  }

  function readData() {}

  function login() {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    itemsRef = firebaseApp.database().ref();

    firebaseApp.auth().signInAnonymously().catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  function logout() {
    firebase.auth().signOut();
    firebaseApp.goOffline();
  }

  return {
    write() {
      writeData();
    },
    read() {
      readData();
    },
    connect() {
      login();
    },
    disconnect() {
      logout();
    },
    registerForEvent(cb) {
      addListener(cb);
    },
    unregisterForEvent(cb) {
      removeListener(cb);
    }
  };
};
