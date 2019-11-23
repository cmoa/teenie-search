import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { dismissEmailAlert } from '../actions/actions'

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
    left: "20vh",
  	height: "20vh",
  	width: "60vh",
  	backgroundColor: '#ffffff',
  	display: 'flex',
  	alignItems: 'center',
  	justifyContent: 'center',
  },
}


class EmailAlert extends Component {
    render() {

      if (this.props.emailAlert === "sending") {
        return ( 
        	<div style={styles.page}>
          	<div style={styles.alert}>
              Sending!
            </div>
          </div>
        )
      } else if (this.props.emailAlert === "sent") {
        return ( 
          <div style={styles.page} onClick={ () => {
            this.props.dismissEmailAlert() 
          }}>
            <div style={styles.alert}>
              Sent!
            </div>
          </div>
        )
      } else if (this.props.emailAlert === "composing") {
        return ( 
          <div>
            <div style={styles.page} onClick={ () => { this.props.dismissEmailAlert() }} />
            <div style={styles.alert}>
              Write Here:
              <div style={styles.emailContainer}>
                  <div style={styles.emailLabel}>
                      Share this photograph:
                  </div>
                  <form 
                      id="emailform"
                      style={{ display: 'flex', width: '100%'}}
                      onSubmit={(event) => {
                          event.preventDefault();
                          this.props.sendPhoto(event, this.props.photo.url)
                          document.forms["emailform"].reset();
                      }}
                  >
                      <input 
                          style={{...globalStyles.searchTerm, display: 'block' }}
                          type="email" 
                          placeholder="Enter an email"
                          onFocus={() => { console.log("show Keyboard") }}
                          onBlur={() => { console.log("hide Keyboard") }}
                          onChange={(event) => console.log(event) }
                      />
                      <button type="submit" form="emailform" style={{ ...styles.emailButton }}>
                          <svg style={{ ...styles.emailIcon }} aria-hidden="true" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" focusable="false"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
                      </button>  

                      <input 
                          style={{...globalStyles.searchTerm, display: 'block' }}
                          type="email" 
                          placeholder="Enter an email"
                          onFocus={() => { console.log("show Keyboard") }}
                          onBlur={() => { console.log("hide Keyboard") }}
                          onChange={(event) => console.log(event) }
                      />

                      <input 
                          style={{...globalStyles.searchTerm, display: 'block' }}
                          type="email" 
                          placeholder="Enter an email"
                          onFocus={() => { console.log("show Keyboard") }}
                          onBlur={() => { console.log("hide Keyboard") }}
                          onChange={(event) => console.log(event) }
                      />
                  </form>  
                            
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
      dismissEmailAlert: () => dispatch(dismissEmailAlert()),
  }
}

const mapStateToProps = state => {
    return {
        emailAlert: state.nav.emailAlert,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailAlert)

