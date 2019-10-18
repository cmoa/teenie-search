import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search }from '../actions';

import React, { Component } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, ImageBackground, View, Text, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import { SearchBar } from 'react-native-elements';

// Style

const searchSuggestionPadding = 5;

const styles = StyleSheet.create({
  section: {
    resizeMode: 'cover',
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
});

// Component 

class aboutScreen extends Component {

	render() {
		return(
			<View style={{ flex : 1, width: '100%', height: '100%', backgroundColor: 'white' }}>
				<StatusBar hidden></StatusBar>
			</View>
		)
	}
}

// Redux 

const mapStateToProps = state => {
  return {
    input: state.search.input,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
     search,
    },
    dispatch,
  ),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(aboutScreen);
