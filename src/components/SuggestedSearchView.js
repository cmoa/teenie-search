
import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { search } from '../actions/actions';
import globalStyles from '../styles';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

const searchSuggestionPadding = 10;

const styles = {
	container: {
		display: "flex", 
		width: "100%", 
		height: "100%", 
		flexDirection: 'column',
	},
	sampleSearchRow: {
		flexDirection: 'row',
	    display: 'flex',
	    flex: 1,
	},
	sampleSearchContainer: {
		position: 'relative',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		backgroundRepeat: 'no-repeat',
    	backgroundSize: 'cover',
    	margin: searchSuggestionPadding / 2,
	},
	sampleSearchTerm: {
		backgroundColor: 'rgba(0, 0, 0, .5)',
		color: 'white',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		height: '100%',
	}
}


const searchTermBank = [
	{
		term: "Hill District",
		photo: 63211,
	},
	{
		term: "1950s",
		photo: 4512,
	},
	{
		term: "Jazz",
		photo: 2514,
	},
	{
		term: "Presidents",
		photo: 59499,
	},
	{
		term: "Civil Rights",
		photo: 7848,
	},
	{
		term: "Portraits",
		photo: 60320,
	},
	{
		term: "Baseball",
		photo: 928,
	},
	{
		term: "1940s",
		photo: 61475,
	},
	{
		term: "Summer",
		photo: 47901,
	},
	{
		term: "Cars",
		photo: 10902,
	},
	{
		term: "Weddings",
		photo: 39088,
	},
	{
		term: "Children",
		photo: 39778,
	},
	{
		term: "Children 2",
		photo: 39778,
	},
	{
		term: "Children 3",
		photo: 39778,
	}
]

class SuggestedSearchView extends Component {


	constructor(props) {
		super(props);
		this.clearTimeouts = this.clearTimeouts.bind(this);

		var timeouts = [];
		var intialSuggestedSearchTerms = _.sampleSize(searchTermBank, this.props.rows * this.props.columns);
		intialSuggestedSearchTerms.map((suggestion, i) => {
			timeouts.push(setTimeout(() => { this.getNewSuggestion(i) }, 500 * (i + 1)));
			return suggestion;
		});

		this.state = { 
			suggestedSearchTerms: intialSuggestedSearchTerms,
			timeouts: timeouts
		};
	}

	componentWillUnmount() {
		this.clearTimeouts();
	}

	clearTimeouts() {
		return this.state.timeouts.map((timeoutID) => {
			clearTimeout(timeoutID);
			return timeoutID;
		})
	}

    getNewSuggestion = (index) => {
    	// Get new suggestion from remaining terms
    	var remainingTerms = _.differenceBy(searchTermBank, this.state.suggestedSearchTerms, 'term');
    	var newSuggestion = _.sample(remainingTerms);

    	// Build new state from old
		this.state.suggestedSearchTerms[index] = newSuggestion;
		this.state.timeouts.push(setTimeout(() => { this.getNewSuggestion(index) }, 5000))

		this.setState({ 
			suggestedSearchTerms: this.state.suggestedSearchTerms,
			timeouts: this.state.timeouts,
		});
	}

    render() {
    	var suggestedSearchRows = _.times(this.props.rows, null).map((n, i) => {
			return _.times(this.props.columns, null).map((n, j) => {
				var suggested = this.state.suggestedSearchTerms[i * this.props.columns + j];
				if (suggested) {
					var photoURL = process.env.PUBLIC_URL + '/images/'+suggested.photo+'.jpg'
					return (
						<CSSTransitionGroup 
							transitionName="example" 
							transitionAppear={true} 
							transitionAppearTimeout={2000} 
							transitionLeave={true} 
							transitionEnterTimeout={2000}
							transitionLeaveTimeout={2000}
							key={suggested.term}
							style={{
								...styles.sampleSearchContainer, 
								backgroundColor: 'black',
							}}
							onClick={() => { this.props.search(suggested.term) }}
						>
								<div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, 
									backgroundImage: 'url('+photoURL+')',
									backgroundSize: '200%',
			    					backgroundPosition: 'center',
			    					backgroundRepeat: 'noRepeat', }} />
								<div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#000000aa" }} />
								<div style={{...globalStyles.photoDetail, color: 'white', fontSize: '1.5rem', position: 'absolute'}}> { suggested.term } </div>
						</CSSTransitionGroup>
					)
				}
				return <div/>
			});
		});

        return ( 
	        <div style={styles.container}>
	        	{
	        		_.times(this.props.rows, null).map(function(n, i) {
				        return (
				        	<div key={i} style={styles.sampleSearchRow}>
								{ suggestedSearchRows[i] } 
							</div>
						)
				    })
	        	}
	        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {
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
)(SuggestedSearchView)

