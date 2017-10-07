import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  NativeModules,
  LayoutAnimation
} from "react-native";
import { Icon } from "react-native-elements";

import styles from "./styles";
import theme from "../../../theme/theme";

const COLLAPSED_VERTICAL_OFF_SET = -90;
const EXPANDED_VERTICAL_OFF_SET = -20;

const { UIManager } = NativeModules;
// Enable LayoutAnimation under Android
// eslint-disable-next-line
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class CollapsableDrawer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    expanded: false
  };

  toggleMenu = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <View
        style={[
          styles.overlay,
          {
            top: this.state.expanded
              ? EXPANDED_VERTICAL_OFF_SET
              : COLLAPSED_VERTICAL_OFF_SET
          }
        ]}
      >
        {this.props.children}
        <TouchableOpacity>
          <Icon
            name={this.state.expanded ? "expand-less" : "expand-more"}
            color={theme.PrimaryTextColor}
            size={30}
            onPress={this.toggleMenu}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
