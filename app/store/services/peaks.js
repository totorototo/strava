import { peaksFinder } from "./helpers/peaks";

export const findPeaks = (elevations = []) => {
  const { ricker } = peaksFinder;
  const find = peaksFinder
    .findPeaks()
    .kernel(ricker)
    .gapThreshold(2)
    .minLineLength(3)
    .minSNR(1.5)
    .widths([1, 2, 10]);

  return new Promise(resolve => {
    resolve(find(elevations));
  });
};
