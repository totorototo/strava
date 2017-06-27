// react
import React from "react";

import { TabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Details from "../details/Details";
import ClubFeed from "../clubFeed/ClubFeed";
import PerformanceMeter from "../performanceMeter/PerformanceMeter";
import RacePredictor from "../racePredictor/RacePredictor";

const Home = TabNavigator(
  {
    PerformanceMeter: {
      screen: PerformanceMeter,
      navigationOptions: {
        tabBarLabel: "Lybito-mtr",
        tabBarIcon: () => <Icon name="whatshot" color="#FC4C02" />
      }
    },
    RacePredictor: {
      screen: RacePredictor,
      navigationOptions: {
        tabBarLabel: "predictor",
        tabBarIcon: () => <Icon name="timer" color="#FC4C02" />
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        tabBarLabel: "athlete",
        tabBarIcon: () => <Icon name="face" color="#FC4C02" />
      }
    },
    ClubFeed: {
      screen: ClubFeed,
      navigationOptions: {
        tabBarLabel: "leaks",
        tabBarIcon: () => <Icon name="comment" color="#FC4C02" />
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: "true",
      labelStyle: {
        fontSize: 12,
        color: "#FC4C02"
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
