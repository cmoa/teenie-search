import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { dismissSearchSettings, search, updateSearchSettings } from '../actions/actions'

import globalStyles from '../styles'

const styles = {
	page: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
    alignItems: 'center',
		height: '100vh',
    width: '100vw',
    backgroundColor: '#000000aa',
	},
  alert: {
    position: 'fixed',
    top: "40vh",
    left: "20vw",
  	height: "20vh",
  	width: "50vw",
    padding: "5vw",
  	backgroundColor: '#ffffff',
  	display: 'flex',
  	alignItems: 'center',
  	justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  largeAlert: {
    position: 'fixed',
    top: "25vh",
    left: "10vw",
    height: "45vh",
    width: "70vw",
    padding: "5vw",
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  input: {
    marginBottom: '3vh',
    maxHeight: '5vh',
    display: 'block',
  },
  textarea: {
    marginBottom: '3vh',
  },
  label: {
    marginBottom: '1vh'
  },
  emailButton: {
      marginLeft: '2.5vh',
      height: "5vh",
      width: "5vh",
      backgroundColor: globalStyles.cmoaRed,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
  },
  cancelButton: {
      marginLeft: 'auto',
      height: "5vh",
      padding: "0 2vh",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid '+globalStyles.cmoaRed,
  },
  emailIcon: {
      color: 'white',
      width: '50%',
  },
}

var timeout;

class SearchSettings extends Component {

    componentWillUnmount() {
      clearTimeout(timeout);
    }

    render() {

      // SENDING
      if (this.props.modal === "SEARCH_SETTINGS") {
        return ( 
        	<div style={styles.page}>
          	<div style={styles.alert}>
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )
      } else {
        return null;
      }
    }
}

const mapDispatchToProps = dispatch => {
	return {
      dismissSearchSettings: () => dispatch(dismissSearchSettings()),
      updateSearchSettings: () => dispatch(updateSearchSettings()),
      search: () => dispatch(search()),
  }
}

const mapStateToProps = state => {
    return {
        modal: state.nav.modal,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchSettings)

