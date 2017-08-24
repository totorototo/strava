import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Circle } from "react-native-progress";

import Faulty from "../../../../components/faulty/Faulty";
import {
  isFaulty,
  getDefect,
  IsLoading
} from "../../../../dataDefinitions/defects";
import selector from "./selector";
import styles from "./styles";
import Loading from "../../../../components/loading/Loading";
import theme from "../../../../theme/theme";

class PerformanceMeter extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string,
      performance: PropTypes.any
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.athlete &&
      nextProps.athlete.performance !== this.props.athlete.performance
    ) {
      this.animate();
    }
  }

  // TODO: define animation (linear, interpolation and cie).
  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > this.props.athlete.performance.value) {
          progress = this.props.athlete.performance.value;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  render() {
    const { athlete } = this.props;
    if (athlete === IsLoading) return <Loading />;

    if (isFaulty(athlete)) return <Faulty message={getDefect(athlete)} />;

    return (
      <View style={styles.container}>
        <Circle
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
          showsText
          size={200}
          color={theme.backgroundColorText}
          borderColor={theme.backgroundColorText}
          // wtf is this color
          unifiledColor="#559988"
        />
        {athlete.performance &&
        athlete.performance.details &&
        athlete.performance.details.length > 0
          ? <View style={styles.details}>
              {athlete.performance.details.map(detail =>
                <Text style={styles.text} key={detail.name}>
                  {detail.name} {detail.value} {detail.unit && detail.unit}
                </Text>
              )}
            </View>
          : null}
      </View>
    );
  }
}

export default connect(selector)(PerformanceMeter);
