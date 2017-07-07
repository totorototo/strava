import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

import { connect } from "react-redux";

import { isFaulty, getDefect } from "../../../dataDefinitions/defects";

import { getCurrentUserID } from "../../../store/state/appState/selectors";
import { getEntity } from "../../../store/state/entities/selectors";

import AreaSpline from "./components/areaSpline/AreaSpline";
import Pie from "./components/pie/Pie";
import data from "./data";
import Theme from "./colors";

import styles from "./styles";

class PerformanceMeter extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string,
      performance: PropTypes.shape({
        avgSpeed: PropTypes.number,
        distance: PropTypes.number,
        elevation: PropTypes.number,
        popularity: PropTypes.number,
        time: PropTypes.number,
        achievements: PropTypes.number,
        stakhanov: PropTypes.number,
        records: PropTypes.number
      })
    }).isRequired
  };

  static shuffle(a) {
    for (let i = a.length; i; i -= 1) {
      const j = Math.floor(Math.random() * i);
      // eslint-disable-next-line no-param-reassign
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear
    };

    this.onPieItemSelected = this.onPieItemSelected.bind(this);
    this.shuffle = PerformanceMeter.shuffle.bind(this);
  }

  onPieItemSelected(newIndex) {
    this.setState({
      ...this.state,
      activeIndex: newIndex,
      spendingsPerYear: this.shuffle(data.spendingsPerYear)
    });
  }

  render() {
    const height = 200;
    const width = 500;
    const { athlete } = this.props;
    if (isFaulty(athlete))
      return (
        <View style={styles.container}>
          <Icon name="watch" color="#FC4C02" size={100} />
          <Text style={styles.text}>
            Oops, I did it again: {getDefect(athlete)}
          </Text>
        </View>
      );

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.chart_title}>
            Distribution of spending this month
          </Text>
          <Pie
            pieWidth={150}
            pieHeight={150}
            onItemSelected={this.onPieItemSelected}
            colors={Theme.colors}
            width={width}
            height={height}
            data={data.spendingsLastMonth}
          />
          <Text style={styles.chart_title}>
            Spending per year in{" "}
            {data.spendingsLastMonth[this.state.activeIndex].name}
          </Text>
          <AreaSpline
            width={width}
            height={height}
            data={this.state.spendingsPerYear}
            color={Theme.colors[this.state.activeIndex]}
          />
        </View>
      </ScrollView>
    );
  }
}

const getAthlete = (state, id) => getEntity(state, "athletes", id);

const mapStateToProps = state => {
  const currentUserID = getCurrentUserID(state);
  return {
    athlete: getAthlete(state, currentUserID)
  };
};

export default connect(mapStateToProps)(PerformanceMeter);
