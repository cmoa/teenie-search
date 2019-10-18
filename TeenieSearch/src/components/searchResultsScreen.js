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
  searchBar: {
  	backgroundColor: 'white',
  	borderRadius: 25, 
  	padding: 5, 
  	flexDirection: 'row',
  	height: 50,
  	width: 400,
  	alignItems: 'center',
  }
});

// Component 

class searchResultsScreen extends Component {

	render() {
		return(
			<View style={{ flex : 1, width: '100%', height: '100%', backgroundColor: 'white' }}>
				<StatusBar hidden></StatusBar>

				<View style={styles.searchBar} >
				    <Icon name="ios-search" size={30} color={"#000"} style={{ marginLeft: 5, marginRight: 8 }}/>
					<TextInput
					  keyboardType={'default'}
					  placeholder={"Search the collection"}
					  clearButtonMode={'while-editing'}
					  enablesReturnKeyAutomatically={true}
					  returnKeyType={'search'}
					  autoCorrect={false}
					  multiline={false}
				      style={{ flex: 1, fontSize: 20 }}
				      // onChangeText={(text) => this.setState({text})}
				      // onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
    				  // value={this.state.text}
    				  keyboardAppearance={'light'}
				    />
				</View>



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
)(searchResultsScreen);
