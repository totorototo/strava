import React from "react";
import { TabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Details from "./details/Details";
import ClubFeed from "./clubFeed/ClubFeed";
import PerformanceMeter from "./performanceMeter/PerformanceMeter";
import RacePredictor from "./race/Race";
import theme from "../../../theme/theme";

const Main = TabNavigator(
  {
    PerformanceMeter: {
      screen: PerformanceMeter,
      navigationOptions: {
        tabBarLabel: "lyb-mtr",
        tabBarIcon: () =>
          <Icon reverse name="whatshot" color={theme.PrimaryColor} />
      }
    },
    RacePredictor: {
      screen: RacePredictor,
      navigationOptions: {
        tabBarLabel: "race",
        tabBarIcon: () =>
          <Icon reverse name="timer" color={theme.PrimaryColor} />
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
        color: theme.PrimaryColorText
      },
      style: {
        backgroundColor: theme.PrimaryColor
      },
      indicatorStyle: {
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
