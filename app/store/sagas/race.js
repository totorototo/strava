import { call, cancelled, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import firebase from "firebase";

import Config from "react-native-config";

function subscribe() {
  return eventChannel(emit => {
    const firebaseConfig = {
      apiKey: Config.FIREBASE_APIKEY,
      authDomain: Config.FIREBASE_AUTHDOMAIN,
      databaseURL: Config.FIREBASE_DATABASEURL,
      storageBucket: Config.FIREBASE_STORAGEBUCKET
    };

    const firebaseApp = firebase.initializeApp(firebaseConfig);

    const itemsRef = firebaseApp.database().ref();

    const messageHandler = snapshot => {
      emit(snapshot);
    };

    itemsRef.on("value", messageHandler);

    // The subscriber must return an unsubscribe function
    return () => {
      itemsRef.off("value", messageHandler);
      firebaseApp.goOffline();
    };
  });
}

export function* watchDatabase() {
  const channel = yield call(subscribe);

  try {
    // eslint-disable no-constant-condition
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      const event = yield take(channel);
      console.log(event);
    }
  } finally {
    if (yield cancelled()) channel.close();
  }
}
