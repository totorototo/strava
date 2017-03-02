// react
import React, { Component, PropTypes } from 'react';

// react-native
import { View, Text } from 'react-native';

// redux
import { connect } from 'react-redux';

import styles from './styles';

// styles
class Home extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.lastname,
    }).isRequired,
  };

  render() {
    const { athlete } = this.props;
    return (
      <View style={styles.home}>
        <Text>{ athlete.details.firstname }</Text>
        <Text>{ athlete.details.lastname }</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({ athlete: state.entities.athlete });

export default connect(mapStateToProps)(Home);
