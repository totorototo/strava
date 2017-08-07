import firebase from "firebase";
import Config from "react-native-config";

export const database = (() => {
  let firebaseApp;

  function addListener(itemKey, callBack) {
    firebaseApp.database().ref(itemKey).on("value", callBack);
  }

  function removeListener(itemKey, callBack) {
    firebaseApp.database().ref(itemKey).on("value", callBack);
  }

  function writeData(itemKey = "", value = {}) {
    return firebaseApp.database().ref(itemKey).set(value);
  }

  function readData(itemKey = "") {
    return firebaseApp
      .database()
      .ref(itemKey)
      .once("value")
      .then(snapshot => ({ snapshot }));
  }

  function login(configuration) {
    firebaseApp = firebase.initializeApp(configuration);
    return firebaseApp.auth().signInAnonymously().catch(error => ({ error }));
  }

  function logout() {
    firebase.auth().signOut();
    firebaseApp.goOffline();
  }

  return {
    write(key = "", data = {}) {
      writeData(key, data);
    },
    read(key = "") {
      readData(key);
    },
    connect(
      config = {
        apiKey: Config.FIREBASE_APIKEY,
        authDomain: Config.FIREBASE_AUTHDOMAIN,
        databaseURL: Config.FIREBASE_DATABASEURL,
        storageBucket: Config.FIREBASE_STORAGEBUCKET
      }
    ) {
      return login(config);
    },
    disconnect() {
      logout();
    },
    registerWatcher(path, cb) {
      addListener(path, cb);
    },
    unregisterWatcher(path, cb) {
      removeListener(path, cb);
    }
  };
})();
