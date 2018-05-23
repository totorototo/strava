import RNFS from "react-native-fs";

export const readDir = (
  path = `${RNFS.ExternalStorageDirectoryPath}/Download`
) =>
  RNFS.readDir(path).then(result =>
    Promise.all([RNFS.stat(result[0].path), result[0].path])
  );

export const readFile = (path = "", encoding = "utf8") =>
  RNFS.readFile(path, encoding);
