import { readDir, readFile, getStat } from "./helpers/file";

export const listTraces = (fileDirectory = "") =>
  readDir(fileDirectory)
    .then(directoryItems =>
      Promise.all(
        directoryItems.map(item => Promise.all([getStat(item.path), item.path]))
      )
    )
    .then(statResult => {
      const files = statResult.filter(stat => stat[0].isFile() === true);
      return Promise.resolve(files);
    })
    .then(files => {
      const gpsFiles = files.filter(file => /\.(gpx|kml)$/i.test(file[1]));
      return Promise.resolve(gpsFiles);
    })
    .then(files => ({ files }), error => ({ error }));

export const readTrace = (filePath = "") =>
  readFile(filePath, "utf8").then(
    contents => ({ contents }),
    error => ({ error })
  );
