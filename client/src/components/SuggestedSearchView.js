
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
		height: '100%'
	}
}


const searchTermBank = [
	{ term: "Hill District", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/15060/sizes/945-420.jpg" },
	{ term: "Homewood", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/23182/sizes/14314-420.jpg" },
	{ term: "Women's Groups", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/27709/sizes/21352-420.jpg" },
	{ term: "Men's Groups", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/18140/sizes/1926-420.jpg" },
	{ term: "Housing", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/23086/sizes/14092-420.jpg" },
	
	{ term: "Civil Rights", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/22290/sizes/13161-420.jpg" },
	{ term: "Schools", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/17308/sizes/4597-420.jpg" },
	{ term: "Baseball", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/22148/sizes/12820-420.jpg" },
	{ term: "Cars", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/36105/sizes/30399-420.jpg" },
	{ term: "Jazz", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/20803/sizes/9761-420.jpg" },
	
	{ term: "Boxing", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/15157/sizes/1775-420.jpg" },
	{ term: "Fashion", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/46662/sizes/40287-420.jpg" },
	{ term: "Pittsburgh Views", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/30471/sizes/24094-420.jpg" },
	{ term: "Crawford Grill", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/16520/sizes/4105-840.jpg" },
	{ term: "Forbes Field", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/18447/sizes/6082-420.jpg" },
	
	{ term: "Steel Mills", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/23510/sizes/9825-420.jpg" },
	{ term: "University of Pittsburgh", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/19600/sizes/7647-420.jpg" },
	{ term: "Churches", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/19718/sizes/6669-420.jpg" },
	{ term: "Barbershops", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/17067/sizes/3831-420.jpg" },

	{ term: "1940s", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/23500/sizes/9705-420.jpg" },
	{ term: "1950s", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/20809/sizes/9844-420.jpg" },
	{ term: "1960s", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/19360/sizes/7521-420.jpg" },
	{ term: "Pittsburgh Courier", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/17926/sizes/5182-420.jpg" },
	{ term: "National Negro Opera", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/14875/sizes/2776-420.jpg" },

	{ term: "Harris Studio", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/30396/sizes/24077-420.jpg" },
	{ term: "Soldier's Portraits", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/46946/sizes/40653-420.jpg" },
	{ term: "Children's Portraits", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/60168/sizes/52669-420.jpg" },
	{ term: "Graduation", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/42074/sizes/35899-840.jpg" },
	{ term: "Weddings", photo: "https://cmoa-collection-images.s3.amazonaws.com/teenie/30140/sizes/23256-420.jpg" }
]

class SuggestedSearchView extends Component {


	constructor(props) {
		super(props);
		this.clearTimeouts = this.clearTimeouts.bind(this);

		var timeouts = [];
		var intialSuggestedSearchTerms = _.sampleSize(searchTermBank, this.props.rows * this.props.columns);
		intialSuggestedSearchTerms.map((suggestion, i) => {
			timeouts.push(setTimeout(() => { this.getNewSuggestion(i) }, 100 * i + 10000));
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
		this.state.timeouts.push(setTimeout(() => { this.getNewSuggestion(index) }, 10000))

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
					return (
						<CSSTransitionGroup 
							transitionName="example" 
							transitionAppear={true} 
							transitionAppearTimeout={3000} 
							transitionLeave={true} 
							transitionEnterTimeout={3000}
							transitionLeaveTimeout={3000}
							key={suggested.term}
							style={{
								...styles.sampleSearchContainer, 
								backgroundColor: 'black',
							}}
							onClick={() => { this.props.search(suggested.term) }}
						>
								<div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, 
									backgroundImage: `url(${suggested.photo})`,
									backgroundSize: '150%',
			    					backgroundPosition: '50% 30%',
			    					backgroundRepeat: 'noRepeat', }} />
								<div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#000000bb" }} />
								<div style={{...globalStyles.photoDetail, color: 'white', fontSize: '1.5rem', width: '80%', textAlign: 'center', position: 'absolute'}}> { suggested.term } </div>
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

