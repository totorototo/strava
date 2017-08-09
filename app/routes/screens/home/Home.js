import React from "react";

import { TabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Details from "../details/Details";
import ClubFeed from "../clubFeed/ClubFeed";
import PerformanceMeter from "../performanceMeter/PerformanceMeter";
import RacePredictor from "../race/Race";

const Home = TabNavigator(
  {
    PerformanceMeter: {
      screen: PerformanceMeter,
      navigationOptions: {
        tabBarLabel: "lyb-mtr",
        tabBarIcon: () => <Icon reverse name="whatshot" color="#FC4C02" />
      }
    },
    RacePredictor: {
      screen: RacePredictor,
      navigationOptions: {
        tabBarLabel: "race",
        tabBarIcon: () => <Icon reverse name="timer" color="#FC4C02" />
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        tabBarLabel: "athlete",
        tabBarIcon: () => <Icon reverse name="face" color="#FC4C02" />
      }
    },
    ClubFeed: {
      screen: ClubFeed,
      navigationOptions: {
        tabBarLabel: "leaks",
        tabBarIcon: () => <Icon reverse name="comment" color="#FC4C02" />
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
        color: "white"
      },
      style: {
        backgroundColor: "#FC4C02"
      },
      indicatorStyle: {
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

export default Home;
