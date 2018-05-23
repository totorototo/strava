import { readDir, readFile } from "./helpers/file";

export const retrieveTraces = (fileDirectory = "") =>
  readDir(fileDirectory).then(result => ({ result }), error => ({ error }));

export const readTrace = (filePath = "") =>
  readFile(filePath, "utf8").then(
    contents => ({ contents }),
    error => ({ error })
  );
