import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "react-native-elements";
import { View, Image } from "react-native";

import styles from "./styles";
import Paragraph from "../../typography/paragraph/Paragraph";

export default class CardList extends Component {
  static propTypes = {
    title: Card.propTypes.title.isRequired,
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
    list: null
  };

  render() {
    // FIXME may be we should display something anyway
    if (!this.props.list) return null;

    return (
      <Card
        dividerStyle={styles.dividerStyle}
        containerStyle={styles.containerCardStyle}
        titleStyle={styles.card}
        title={this.props.title}
      >
        {this.props.list.map(item =>
          <View key={item.key} style={styles.item}>
            {typeof item.image === "string"
              ? <Image
                  style={styles.image}
                  source={{ uri: item.image.toString() }}
                />
              : <Icon color={item.image.color} name={item.image.name} />}
            <Paragraph>
              {item.text}
            </Paragraph>
          </View>
        )}
      </Card>
    );
  }
}
