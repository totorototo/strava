import React from "react";
import { TabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Details from "./athleteDetails/AthleteDetails";
import ClubFeed from "./clubFeed/ClubFeed";
import PerformanceMeter from "./athletePerformanceLevel/AthletePerformanceLevel";
import RacePredictor from "./clubEvents/ClubEvents";
import theme from "../../theme/theme";

const Main = TabNavigator(
  {
    PerformanceMeter: {
      screen: PerformanceMeter,
      navigationOptions: {
        tabBarLabel: "lyb-mtr",
        tabBarIcon: () =>
          <Icon reverse name="network-check" color={theme.PrimaryColor} />
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        tabBarLabel: "athlete",
        tabBarIcon: () =>
          <Icon reverse name="face" color={theme.PrimaryColor} />
      }
    },
    RacePredictor: {
      screen: RacePredictor,
      navigationOptions: {
        tabBarLabel: "events",
        tabBarIcon: () =>
          <Icon reverse name="event" color={theme.PrimaryColor} />
      }
    },
    ClubFeed: {
      screen: ClubFeed,
      navigationOptions: {
        tabBarLabel: "leaks",
        tabBarIcon: () =>
          <Icon reverse name="comment" color={theme.PrimaryColor} />
      }
    }
  },
  {
    lazy: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 12,
        color: theme.SecondaryTextColor
      },
      style: {
        backgroundColor: theme.PrimaryColor
      },
      indicatorStyle: {
        //
        // TODO replace color
        backgroundColor: "white"
      },
      tabStyle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }
    }
  }
);

export default Main;
