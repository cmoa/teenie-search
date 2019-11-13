import React, {Component} from 'react';
import { connect } from 'react-redux'
import { search } from '../actions/actions'

const searchSuggestionPadding = 10;

const styles = {
	page: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		height: '100vh',
    	width: '100vw'
	},
	topHalf: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray',
	},
	bottomHalf: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'white',
		padding: searchSuggestionPadding / 2,
	},
	sampleSearchRow: {
		flexDirection: 'row',
	    display: 'flex',
	    flex: 1,
	},
	reachOutRow: {
		flex: .25,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		backgroundColor: 'black',
		color: 'white',
		margin: searchSuggestionPadding / 2,
	},
	sampleSearchContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		backgroundImage: 'url("https://via.placeholder.com/200x200")',
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

class Home extends Component {
    render() {

    	var suggestedSearchTerms = [
			"Hill District",
			"1950s",
			"Jazz",
			"Presidents",
			"Civil Rights",
			"Portraits",
		]

		var suggestedSearchView = suggestedSearchTerms.map((term, i) => {
			return (
				<div  
					style={styles.sampleSearchContainer}
					onClick={() => { this.props.search(term) }}
				>
					<div style={styles.sampleSearchTerm}> { term } </div>
				</div>
			)
		});

        return ( 
	        <div style={styles.page}>
	            <div style={styles.topHalf}>
	            </div> 
	            <div style={styles.bottomHalf}> 
	                <div style={styles.sampleSearchRow}>
						{ suggestedSearchView[0] } 
						{ suggestedSearchView[1] } 
						{ suggestedSearchView[2] } 
					</div>
	                <div style={styles.sampleSearchRow}>
						{ suggestedSearchView[3] } 
						{ suggestedSearchView[4] } 
						{ suggestedSearchView[5] } 
					</div>
	            </div> 
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
)(Home)

