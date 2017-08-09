import { getCurrentLocation } from "./helpers/geolocation";

export const getCurrentAthleteLocation = () => {
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000
  };

  return getCurrentLocation(geolocationOptions).then(
    position => ({ position }),
    error => ({ error })
  );
};
