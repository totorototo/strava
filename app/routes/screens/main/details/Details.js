import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";

import {
  isFaulty,
  getDefect,
  IsLoading
} from "../../../../dataDefinitions/defects";
import selector from "./selector";
import styles from "./styles";
import Loading from "../../../../components/loading/Loading";
import Faulty from "../../../../components/faulty/Faulty";
import CardList from "../../../../components/cardList/CardList";
import { getIconName } from "../clubFeed/helper";
import theme from "../../../../theme/theme";

class Details extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string
    }).isRequired
  };

  render() {
    const { athlete } = this.props;
    if (athlete === IsLoading) return <Loading />;

    if (isFaulty(athlete)) return <Faulty message={getDefect(athlete)} />;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Card
            containerStyle={styles.athleteImageStyle}
            titleStyle={styles.card}
            title="ATHLETE"
            image={{ uri: athlete.profile }}
          >
            <Text style={styles.text}>
              Anything you need to know about {athlete.firstname}{" "}
              {athlete.lastname}. performance, data, predictions and much more!
            </Text>
          </Card>
          {athlete.performance &&
          athlete.performance.details &&
          athlete.performance.details.length > 0
            ? <CardList
                title={"DETAILS"}
                list={athlete.performance.details.map((detail, index) => ({
                  key: index,
                  image: {
                    name: getIconName(detail.name),
                    color: theme.PrimaryColor
                  },
                  text: `${detail.value}  ${detail.unit}`
                }))}
              />
            : null}
        </ScrollView>
      </View>
    );
  }
}

export default connect(selector)(Details);
