import RNFS from "react-native-fs";

export const readDir = (
  path = `${RNFS.ExternalStorageDirectoryPath}/Download`
) => RNFS.readDir(path);

export const readFile = (path = "", encoding = "utf8") =>
  RNFS.readFile(path, encoding);

export const getStat = (path = "") => RNFS.stat(path);
