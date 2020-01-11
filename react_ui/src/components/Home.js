import React, {Component} from 'react';
import { connect } from 'react-redux';

import SuggestedSearchView from './SuggestedSearchView';

import TeenieHeroImage from './../images/4965-1680.jpg';

const styles = {
	page: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		height: '100vh',
    	width: '100vw',
		WebkitOverflowScrolling: 'touch',
		overflow:'auto'
	},
	topHalf: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black',
		backgroundImage: `url(${TeenieHeroImage})`,
		backgroundPosition: '65% 33%',
		backgroundSize: '300%',
	},
	bottomHalf: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'white',
		padding: 5,
	},
}


class Home extends Component {
    render() {
        return ( 
	        <div style={styles.page}>
	            <div style={styles.topHalf}>
	            </div> 
	            <div style={styles.bottomHalf}> 
	            	<SuggestedSearchView rows={2} columns={3} />
	            </div> 
	        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {}
}

const mapStateToProps = state => {
    return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

