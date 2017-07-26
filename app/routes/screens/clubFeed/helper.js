export const getIconName = (value = "") => {
  let name = "";
  switch (value) {
    case "distance":
      name = "flight";
      break;
    case "total_elevation_gain":
      name = "landscape";
      break;

    case "elapsed_time":
      name = "timer";
      break;

    case "max_speed":
      name = "motorcycle";
      break;

    case "achievement_count":
      name = "star";
      break;

    default:
      name = "error";
  }
  return name;
};
