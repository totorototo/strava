import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import { View, Image } from "react-native";

import styles from "./styles";
import Paragraph from "../../typography/paragraph/Paragraph";
import Card from "../card/Card";

export default class CardList extends Component {
  static propTypes = {
    title: Card.propTypes.title,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        image: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired
          })
        ]).isRequired,
        text: PropTypes.string.isRequired
      })
    )
  };

  static defaultProps = {
    title: null,
    list: []
  };

  render() {
    return (
      <Card title={this.props.title}>
        {this.props.list.map(item => (
          <View key={item.key} style={styles.item}>
            {typeof item.image === "string" ? (
              <Image
                style={styles.image}
                source={{ uri: item.image.toString() }}
              />
            ) : (
              <Icon
                iconStyle={styles.image}
                color={item.image.color}
                name={item.image.name}
              />
            )}
            <Paragraph>{item.text}</Paragraph>
          </View>
        ))}
      </Card>
    );
  }
}
