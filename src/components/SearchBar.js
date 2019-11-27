import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { updateSearchTerm, search } from '../actions/actions'

import globalStyles from '../styles'

import posed from 'react-pose';

const styles = {
	searchContainer: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		height: '12vh',
	},
  searchButton: {
  	height: "5vh",
  	width: "5vh",
  	backgroundColor: globalStyles.cmoaRed,
  	display: 'flex',
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  searchIcon: {
  	color: 'white',
  	width: '40%',
  	height: '40%',
  },
}

const SearchContainer = posed.div({
  home: { 
	top: '25vh',
	width: '55vw',
  	opacity: 1,
  	transition: {
    	top: { type: 'spring' },
  	}	
  },
  results: { 
  	opacity: 1,
  	top: '5vw',
  	width: '90vw',
  },
  none: { display: 'none' }
});


class SearchBar extends Component {
    render() {
    	console.log(this.props.screen);

    	var pose = "none";
    	if (this.props.screen === "HOME") {
    		pose = "home";
    	} else if (this.props.screen === "SEARCH_RESULTS") {
    		pose = "results";
    	}

        return ( 
        	<div style={styles.searchContainer}>
	        	<SearchContainer pose={pose} style={{ position: 'fixed', width: '50%', display:'flex' }}>
	        		<form 
	        			style={{ display: 'flex', width: '100%'}}
	        			onSubmit={(event) => {
	        				event.preventDefault();
	        				this.props.search(this.props.searchTerm)
	        			}}
	        		>
		                <input 
		                	style={{ ...globalStyles.searchTerm }}
		                	type="search" 
		                	placeholder="Search the Teenie Harris Archives..."
		                	value={this.props.searchTerm} 
		                	onFocus={() => { console.log("show Keyboard") }}
		                	onBlur={() => { console.log("hide Keyboard") }}
		                	onChange={(event) => this.props.updateSearchTerm(event.currentTarget.value) }
		                />
		                <div style={styles.searchButton} onClick={() => { this.props.search(this.props.searchTerm) }}>
		                	<svg style={styles.searchIcon} viewBox="0 0 16 16"><path fill="currentColor" d="M15.6 13.1l-3-3c.6-.9.9-2 .9-3.2 0-3.6-3-6.6-6.6-6.6C3.3.3.3 3.3.3 6.9c0 3.6 3 6.6 6.6 6.6 1.4 0 2.7-.4 3.8-1.2l2.9 2.8c.4.4 1 .4 1.4 0l.6-.6c.4-.4.4-1 0-1.4zM6.9 9.6c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7c.1 1.5-1.2 2.7-2.7 2.7z"></path></svg>
		                </div>
		            </form>
	            </SearchContainer> 
	        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {
		updateSearchTerm: (term) => dispatch(updateSearchTerm(term)),
		search: (term) => dispatch(search(term)),
	}
}

const mapStateToProps = state => {
    return {
        searchTerm: state.search.term,
        screen: state.nav.screen,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchBar)

