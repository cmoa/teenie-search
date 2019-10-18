import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import rootScreen from './components/rootScreen';
import searchResultsScreen from './components/searchResultsScreen';
import aboutScreen from './components/aboutScreen';

const sceneCreator = (
  SceneComp,
  store,
  { screenName },
) => {
  return () =>
    class SceneWrapper extends Component {
      static get options() {
        return { ...SceneComp.options };
      }

      constructor(props) {
        super(props);
        this.sceneCompRef = React.createRef();
        console.log("sfasdf");
      }

      componentDidAppear() {
        // Analytics.trackEvent('Screen Viewed', { screenName });
        console.log("sfasdf");
      }

      componentDidDisappear() {
      }

      componentWillUnmount() {
      }

      render() {
        return (
          <Provider store={store}>
            <SceneComp ref={this.sceneCompRef} {...this.props} />
          </Provider>
        );
      }
    };
};


const registerScreens = store => {
  Navigation.registerComponent(
    'rootScreen',
    sceneCreator(rootScreen, store, {
      screenName: 'rootScreen',
    }),
    () => rootScreen,
  );

  Navigation.registerComponent(
    'searchResultsScreen',
    sceneCreator(searchResultsScreen, store, {
      screenName: 'searchResultsScreen',
    }),
    () => searchResultsScreen,
  );

  Navigation.registerComponent(
    'aboutScreen',
    sceneCreator(aboutScreen, store, {
      screenName: 'aboutScreen',
    }),
    () => aboutScreen,
  );
};

export default registerScreens;
