
import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { search } from '../actions/actions';

import globalStyles from '../styles';

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



class SuggestedSearchView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			suggestedSearchTerms: [
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
	    		}
			],
			timer: window.setTimeout(() => { this.shuffleSuggestions() }, 3000),
		};


	}

	componentWillUnmount() {
		window.clearTimeout(this.state.timer);
	}

	shuffleSuggestions = () => {
		console.log("Trigger Shuffle");

		this.setState({
			suggestedSearchTerms: _.shuffle(this.state.suggestedSearchTerms),
			timer: window.setTimeout(() => { this.shuffleSuggestions() }, 3000)
		})
	}

    render() {

		var suggestedSearchView = this.state.suggestedSearchTerms.map((suggested, i) => {
			var photoURL = process.env.PUBLIC_URL + '/images/'+suggested.photo+'.jpg'
			return (
				<div  
					style={{
						...styles.sampleSearchContainer, 
						backgroundSize: 'cover', 
						backgroundImage: 'url('+photoURL+')',
						backgroundSize: '200%',
    					backgroundPosition: 'center',
    					backgroundRepeat: 'noRepeat',
					}}
					onClick={() => { this.props.search(suggested.term) }}
				>
					<div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#000000aa" }}></div>
					<div style={{...globalStyles.photoDetail, color: 'white', fontSize: '1.5rem', position: 'absolute'}}> { suggested.term } </div>
				</div>
			)
		});

        return ( 
	        <div style={styles.container}>
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

