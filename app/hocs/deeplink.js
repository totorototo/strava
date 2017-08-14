import React, { Component } from "react";
import { Linking /* Platform*/ } from "react-native";
import hoistStatics from "hoist-non-react-statics";
import Config from "react-native-config";

const { URL_SHEME_PREFIX, URL_SHEME_HOST } = Config;

function getPathAndQuery(url) {
  const baseUrlSheme = `${URL_SHEME_PREFIX}://${URL_SHEME_HOST}/`;
  return url.indexOf(baseUrlSheme) === -1 ? url : url.replace(baseUrlSheme, "");
}

export default function deeplink(WrappedComponent) {
  class DeeplinkingContainer extends Component {
    static contextTypes = {
      store: React.PropTypes.object
    };

    componentDidMount() {
      Linking.getInitialURL().then(this.handleOpenURL).catch(err => {
        // eslint no-console: "error"
        console.error("[Deep linking] An error occurred ", err);
      });
      Linking.addEventListener("url", this.handleOpenURL);
    }

    componentWillUnmount() {
      Linking.removeEventListener("url", this.handleOpenURL);
    }

    handleOpenURL = event => {
      if (event && event.url) {
        const navigationAction = WrappedComponent.router.getActionForPathAndParams(
          getPathAndQuery(event.url)
        );
        if (navigationAction) {
          this.context.store.dispatch(navigationAction);
        } else {
          console.warn(
            `[Deep linking] couldn't find a matching route for the url sheme "${event.url}"`
          );
        }
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistStatics(DeeplinkingContainer, WrappedComponent);
}
