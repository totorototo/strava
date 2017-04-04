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

    if (athlete !== undefined && Object.keys(athlete).length > 0) {
      return (
        <View style={styles.home}>
          <Text>{ athlete.firstname }</Text>
          <Text>{ athlete.lastname }</Text>
        </View>
      );
    }
    return null;
  }
}

// TODO: return array first item. Add parameter to return given athlete.
const getCurrentAthlete = athletes => Object.values(athletes)[0];

const mapStateToProps = state => ({
  athlete: getCurrentAthlete(state.entities.athletes),
});

export default connect(mapStateToProps)(Home);
