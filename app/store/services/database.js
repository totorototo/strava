import Config from "react-native-config";
import { database } from "./helpers/database";

export const authenticate = () => {
  const configuration = {
    apiKey: Config.FIREBASE_APIKEY,
    authDomain: Config.FIREBASE_AUTHDOMAIN,
    databaseURL: Config.FIREBASE_DATABASEURL,
    storageBucket: Config.FIREBASE_STORAGEBUCKET
  };

  return database.connect(configuration).catch(error => ({ error }));
};

export const disconnect = () => {
  database.disconnect();
};

export const watchData = cb => {
  database.registerWatcher(cb);
};

export const unwatchData = cb => {
  database.unregisterWatcher(cb);
};

export const writeData = (key = "", data = {}) => database.write(data);

export const readData = (key = "") => database.read(key);
