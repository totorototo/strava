export const getIconName = (value = "") => {
  const mapping = {
    distance: "drive-eta",
    total_elevation_gain: "landscape",
    elapsed_time: "timer",
    max_speed: "motorcycle",
    achievement_count: "star",
    elevation: "landscape",
    duration: "timer",
    pace: "flash-on",
    "runs count": "plus-one"
  };

  return mapping[value] || "error";
};
