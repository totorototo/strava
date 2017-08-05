import { call, cancelled, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  authenticate,
  disconnect,
  registerCallBackForEvent,
  unregisterCallBackForEvent
} from "../services/database";

function subscribe() {
  return eventChannel(emit => {
    const handler = snapshot => {
      emit(snapshot.val());
    };

    // TODO: promise, call, generators?
    authenticate();
    registerCallBackForEvent(handler);

    // The subscriber must return an unsubscribe function
    return () => {
      disconnect();
      unregisterCallBackForEvent(handler);
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
