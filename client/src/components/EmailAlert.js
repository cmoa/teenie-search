import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { sendMessage ,dismissEmailAlert } from '../actions/actions'

import globalStyles from '../styles'

const styles = {
	page: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
    alignItems: 'center',
		height: '100vh',
    width: '100vw',
    top: 0,
    bottom: 0,
    left: 0, 
    right: 0,
    backgroundColor: '#000000aa',
    overflow: 'scroll'
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

class EmailAlert extends Component {

    constructor(props) {
      super(props);
      this.message_sender = React.createRef();
      this.message_contact = React.createRef();
      this.message_content = React.createRef();
    }

    componentWillUnmount() {
      clearTimeout(timeout);
    }

    render() {

      // SENDING
      if (this.props.emailAlert === "sending") {
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
      // PHOTO SENT
      } else if (this.props.emailAlert === "photoSent") {
        timeout = setTimeout(this.props.dismissEmailAlert, 1500);
        return ( 
          <div style={styles.page} onClick={ () => {
            this.props.dismissEmailAlert() 
          }}>
            <div style={{...styles.alert, ...globalStyles.body}}>
              Sent!
            </div>
          </div>
        )
      // MESSAGE SENT
      } else if (this.props.emailAlert === "messageSent") {
        timeout = setTimeout(this.props.dismissEmailAlert, 3000);
        return ( 
          <div style={styles.page} onClick={ () => {
            this.props.dismissEmailAlert() 
          }}>
             <div style={{...styles.alert, ...globalStyles.body}}>
              <div>Thanks for reaching out! </div>
              <div>We'll be in contact soon. </div>
            </div>
          </div>
        )
      // COMPOSING
      } else if (this.props.emailAlert === "composing") {
        return ( 
          <div>
            <div style={styles.page} />
            <div style={{ ...styles.largeAlert}}>
              <form 

                  id="messageform"
                  style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%'}}
                  onSubmit={(event) => {
                      event.preventDefault();
                      this.props.sendMessage(
                        this.message_content.current.value, 
                        this.message_sender.current.value, 
                        this.message_contact.current.value, 
                        this.props.photo
                      );
                  }}
              >
                  <label className="required" style={{ ...globalStyles.body, ...styles.label}} >
                    To Teenie Harris Archive:
                  </label>
                  <textarea 
                      ref={this.message_content}
                      style={{...globalStyles.searchTerm, ...styles.textarea }}
                      rows="4" cols="50"
                      placeholder="Write your message..."
                      required
                  />

                  <label className="required" style={{ ...globalStyles.body, ...styles.label}} >
                    From:
                  </label>
                  <input 
                      ref={this.message_sender}
                      style={{...globalStyles.searchTerm, ...styles.input }}
                      type="text" 
                      placeholder="Your name"
                      required
                  />

                  <label style={{ ...globalStyles.body, ...styles.label}} >
                    Best way to reach you:
                  </label>
                  <input 
                      ref={this.message_contact}
                      type="text"
                      style={{...globalStyles.searchTerm, ...styles.input }}
                      placeholder="Contact phone number or email address..."
                  />
                  <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', alignItems: 'center'}}>
                    <div className="touchTarget cancelCollectionInquiryEmail" style={{ ...styles.cancelButton, ...globalStyles.body, color: globalStyles.cmoaRed }} onClick={() => this.props.dismissEmailAlert()}>
                      Cancel
                    </div> 
                    <button className="touchTarget sendCollectionInquiryEmail" type="submit" form="messageform" style={{ ...styles.emailButton }}>
                        <svg style={{ ...styles.emailIcon }} aria-hidden="true" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" focusable="false"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
                    </button> 
                  </div>
              </form>  
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
      sendMessage: (message, name, contact, photo) => dispatch(sendMessage(message, name, contact, photo)),
  }
}

const mapStateToProps = state => {
    return {
        photo: state.photo.photo,
        emailAlert: state.nav.emailAlert,
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailAlert)

