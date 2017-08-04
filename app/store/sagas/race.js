import { call, cancelled, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import { database } from "../services/helpers/database";

function subscribe() {
  return eventChannel(emit => {
    const messageHandler = snapshot => {
      emit(snapshot.val());
    };

    const db = database();

    db.connect();
    db.registerForEvent(messageHandler);

    // The subscriber must return an unsubscribe function
    return () => {
      db.unregisterForEvent(messageHandler);
      db.disconnect();
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
