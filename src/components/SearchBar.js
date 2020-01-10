import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { updateSearchTerm, search, resetInteractive } from '../actions/actions'

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
  clearButton: {
    height: "3vh",
    width: "3vh",
    right: "6vh",
    top: "1vh",
    position: 'absolute',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
  	color: 'white',
  	width: '40%',
  	height: '40%',
  },
  backButton: {
    height: "5vh",
    width: "5vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: globalStyles.cmoaRed,
    width: '30%',
    height: '30%',
    transform: 'rotate(270deg)',
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

    constructor(props) {
      super(props)
      this.input = React.createRef();
    }

    render() {

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
                this.input.current.blur();
        			}}
        		>     { this.props.screen === "SEARCH_RESULTS" &&
                    <div style={styles.backButton} onClick={() => { this.props.resetInteractive() }}>
                      <svg style={styles.backIcon} className="svg-inline--fa fa-chevron fa-w-16" aria-hidden="true" data-prefix="cmoa" data-icon="chevron" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" data-fa-i2svg="" focusable="false"><path fill="currentColor" d="M375,185.4L250,55.8L125,185.4L0,315.1l125,129.6l125-129.6l125,129.6l125-129.6L375,185.4L375,185.4L375,185.4z"></path></svg>
                    </div>
                  }
	                <input 
	                	style={{ ...globalStyles.searchTerm }}
	                	type="search" 
                    ref={this.input}
	                	placeholder="Search the Teenie Harris Archive..."
	                	value={this.props.searchTerm} 
	                	onFocus={() => { console.log("show Keyboard") }}
	                	onBlur={() => { console.log("hide Keyboard") }}
	                	onChange={(event) => this.props.updateSearchTerm(event.currentTarget.value) }
	                />
                  { this.props.searchTerm !== "" && 
                    <div style={styles.clearButton} onClick={ (event) => { 
                      this.props.updateSearchTerm("") 
                      this.input.current.focus();
                    }}>
                      <span id="searchclear"></span>
                    </div>
	                }
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
    resetInteractive: (term) => dispatch(resetInteractive())
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

