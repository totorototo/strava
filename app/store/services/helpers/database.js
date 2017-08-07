import firebase from "firebase";
import Config from "react-native-config";

export const database = (() => {
  let firebaseApp;
  let itemsRef;

  function addListener(callBack) {
    itemsRef.on("value", callBack);
  }

  function removeListener(callBack) {
    itemsRef.on("value", callBack);
  }

  function writeData(value = {}) {
    itemsRef.update(value).then(() => ({ status: "done" })).catch(error => ({
      error
    }));
  }

  function readData() {
    return itemsRef
      .once("value")
      .then(snapshot => ({ positions: snapshot.val() }));
  }

  function login(configuration) {
    firebaseApp = firebase.initializeApp(configuration);
    itemsRef = firebaseApp.database().ref();
    return firebaseApp.auth().signInAnonymously().catch(error => ({ error }));
  }

  function logout() {
    firebase.auth().signOut();
    firebaseApp.goOffline();
  }

  return {
    write(data = {}) {
      writeData(data);
    },
    read() {
      readData();
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
    registerWatcher(cb) {
      addListener(cb);
    },
    unregisterWatcher(cb) {
      removeListener(cb);
    }
  };
})();
