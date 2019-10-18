/**
 * @format
 */
import { Navigation } from 'react-native-navigation';

import registerScreens from './registerScreens';

import { configureStore } from './store';
import { Provider } from 'react-redux';

import KeyboardManager from 'react-native-keyboard-manager'

const store = configureStore();
registerScreens(store);

KeyboardManager.setPreventShowingBottomBlankSpace(true);
KeyboardManager.setEnableAutoToolbar(false);
KeyboardManager.setShouldShowToolbarPlaceholder(false);
KeyboardManager.setShouldResignOnTouchOutside(true);


Navigation.events().registerAppLaunchedListener(async () => {

  // hydrate(newVersion || __DEV__);

  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
    }
  });


  // Set initial View
  Navigation.setRoot({
	root: {
	  stack: {
	    children: [{
	      component: {
	        name: "rootScreen"
	      }
	    }]
	  }
	} 
  });


});
