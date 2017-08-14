export const getIconName = (value = "") => {
  const mapping = {
    distance: "flight",
    total_elevation_gain: "landscape",
    elapsed_time: "timer",
    max_speed: "motorcycle",
    achievement_count: "star"
  };

  return mapping[value] || "error";
};
