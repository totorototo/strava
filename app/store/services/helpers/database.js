import firebase from "firebase";

export const database = (() => {
  let firebaseApp;

  function addListener(itemKey, callBack) {
    firebaseApp.database().ref(itemKey).on("value", callBack);
  }

  function removeListener(itemKey, callBack) {
    firebaseApp.database().ref(itemKey).on("value", callBack);
  }

  function writeData(itemKey = "", value = {}) {
    return firebaseApp
      .database()
      .ref(itemKey)
      .set(value)
      .catch(error => ({ error }));
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
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: ""
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
