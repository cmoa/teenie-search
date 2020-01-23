import React, {Component}
from 'react';
import { connect } from 'react-redux'
import { openPhoto } from '../actions/actions'

const styles = {
    photoSuggestions: {
        overflowX: 'scroll',
        scrollY: 'none',
        display: 'flex',
        width:'95vw',
        paddingLeft: '5vw',
    },
    recommendedImage: {
        height: '20vh',
        minHeight: '20vh',
        display: 'inlineBlock',
        paddingRight: '5vw',
        width: 'auto',
        objectFit: 'contain'
    },
}

class HorizontalPhotoGallery extends Component {

    render() {

        return ( 
          <div style={styles.photoSuggestions} className="smoothScroller"> 
                { this.props.photos.map((photo, index) => {
                    return(
                      <img 
                        className="touchTarget"
                        key={"images_"+index}
                        onClick={() => { this.props.openPhoto(photo) }}
                        alt="" 
                        style={styles.recommendedImage} 
                        src={photo.image_url_small} 
                      />
                    );
                })}              
             
          </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {
    openPhoto: (irn) => dispatch(openPhoto(irn)),
  }
}

const mapStateToProps = state => {
    return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HorizontalPhotoGallery)

