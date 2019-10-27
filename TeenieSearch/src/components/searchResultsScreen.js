import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { search }from '../actions';

import React, { Component } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, ImageBackground, View, Text, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from "react-native-vector-icons/Ionicons";

// Style

const searchSuggestionPadding = 5;

const styles = StyleSheet.create({
  section: {
    resizeMode: 'cover',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subSection: {
  	flex: 1,
    flexGrow: 1,
  	width: '100%',
  	height: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
  },
  sampleSearchContainer: {
  	flex: 1,
  	flexGrow: 1,
    margin: searchSuggestionPadding,
    backgroundColor: 'black',
  },
  sampleSearchImage: {
  	width: '100%',
  	height: '100%',
  	alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
  	fontSize: 40,
  	color: 'white',
  	marginBottom: 30,
  },
  sampleSearchText: {
  	fontSize: 30,
  	color: 'white',
  },
  contactButtonContainer: {
  	width: '100%',
  	height: '100%',
  	backgroundColor: '#aaa',
  	alignItems: 'center',
  	justifyContent: 'center',
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
		var suggestedSearchTerms = [
			"Hill District",
			"1950s",
			"Jazz",
			"Presidents",
			"Civil Rights",
			"Portraits",
			"Teenie",
			"Birthdays",
			"Baseball",
			"Crawford Grill",
			"Puppies",
			"Pittsburgh Courier"
		]

		var suggestedSearchView = suggestedSearchTerms.map((term, i) => {
			return (
				<TouchableOpacity 
					style={styles.sampleSearchContainer}
					onPress={() => this.props.actions.search(term)}
				>
					<ImageBackground 
						style={styles.sampleSearchImage}
						source={require('../assets/placeholder.jpg')}
						imageStyle={{ opacity: .5, resizeMode: 'cover' }}
					>
						<Text style={styles.sampleSearchText}>
							{ term }
						</Text>
					</ImageBackground>
				</TouchableOpacity>
			)
		});

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
    				  value={this.props.term}
    				  keyboardAppearance={'light'}
				    />
				</View>

				{this.props.results.length === 0 &&
					<View style={styles.section}>
						<Text> No results, try: </Text>
						<View style={[styles.section, { flexDirection: 'column' }]}>
							<View style={[styles.subSection, { flexDirection: 'row', paddingLeft: searchSuggestionPadding, paddingRight: searchSuggestionPadding, paddingTop: searchSuggestionPadding }]}>
								{ suggestedSearchView[0] } 
								{ suggestedSearchView[1] } 
								{ suggestedSearchView[2] } 
							</View>
							<View style={[styles.subSection, { flexDirection: 'row', paddingLeft: searchSuggestionPadding, paddingRight: searchSuggestionPadding }]}>
								{ suggestedSearchView[3] } 
								{ suggestedSearchView[4] } 
								{ suggestedSearchView[5] } 
							</View>
							<View style={[styles.subSection, { flexDirection: 'row', paddingLeft: searchSuggestionPadding, paddingRight: searchSuggestionPadding }]}>
								{ suggestedSearchView[6] } 
								{ suggestedSearchView[7] } 
								{ suggestedSearchView[8] } 
							</View>
							<View style={[styles.subSection, { flexDirection: 'row', paddingLeft: searchSuggestionPadding, paddingRight: searchSuggestionPadding, paddingBottom: searchSuggestionPadding }]}>
								{ suggestedSearchView[9] } 
								{ suggestedSearchView[10] } 
								{ suggestedSearchView[11] } 
							</View>
							<View style={[styles.subSection, { flexDirection: 'row' }]}>
								<TouchableOpacity style={styles.contactButtonContainer} 
									onPress={() => {
										Navigation.push(this.props.componentId, {
										  component: {
										    name: 'aboutScreen',
										    passProps: {},
										    options: {
										      topBar: {
										        title: {
										          text: "ABOUT"
										        }
										      }
										    }
										  }
										});
									}}
								>
									<Text style={styles.sampleSearchText}>
										Reach Out
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				}



			</View>
		)
	}
}

// Redux 

const mapStateToProps = state => {
  return {
    term: state.search.term,
    results: state.search.results,
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
