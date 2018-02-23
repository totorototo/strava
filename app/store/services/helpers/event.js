import { ELEVATION_COLORS, ELEVATION_GRADE } from "../../constants/elevation";

export const convertPercentToGrade = percent => {
  if (Math.abs(percent) < 5) {
    return ELEVATION_GRADE.SMALL;
  } else if (Math.abs(percent) >= 5 && Math.abs(percent) < 7) {
    return ELEVATION_GRADE.EASY;
  } else if (Math.abs(percent) >= 7 && Math.abs(percent) < 10) {
    return ELEVATION_GRADE.MEDIUM;
  } else if (Math.abs(percent) >= 10 && Math.abs(percent) < 15) {
    return ELEVATION_GRADE.DIFFICULT;
  } else if (Math.abs(percent) >= 15) {
    return ELEVATION_GRADE.HARD;
  }
  return ELEVATION_GRADE.UNKNOWN;
};

export const convertGradeToColor = grade => {
  if (grade === ELEVATION_GRADE.SMALL) {
    return ELEVATION_COLORS.SMALL;
  } else if (grade === ELEVATION_GRADE.EASY) {
    return ELEVATION_COLORS.EASY;
  } else if (grade === ELEVATION_GRADE.MEDIUM) {
    return ELEVATION_COLORS.MEDIUM;
  } else if (grade === ELEVATION_GRADE.HARD) {
    return ELEVATION_COLORS.HARD;
  } else if (grade === ELEVATION_GRADE.DIFFICULT) {
    return ELEVATION_COLORS.DIFFICULT;
  }
  return ELEVATION_COLORS.UNKNOWN;
};
