import { TabNavigator } from "react-navigation";

import Details from "../details/Details";
import ClubFeed from "../clubFeed/ClubFeed";
import PerformanceMeter from "../performanceMeter/PerformanceMeter";
import RacePredictor from "../racePredictor/RacePredictor";

const Home = TabNavigator(
  {
    PerformanceMeter: { screen: PerformanceMeter },
    RacePredictor: { screen: RacePredictor },
    Details: { screen: Details },
    ClubFeed: { screen: ClubFeed }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: "grey"
      },
      style: {
        backgroundColor: "white"
      },
      indicatorStyle: {
        backgroundColor: "#FC4C02"
      }
    }
  }
);

export default Home;
