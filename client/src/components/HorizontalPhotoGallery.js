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

    constructor(props) {
      super(props)
      this.safariScrollerHorizontal = React.createRef();
    }

    componentDidMount() {
      // Following code prevents safari from freezing up the scroll for 3 sec. scroll bug
      var elem = this.safariScrollerHorizontal.current;
      elem.addEventListener('touchstart', function(event){
          this.allowLeft = (this.scrollLeft > 0);
          this.allowRight = (this.scrollLeft < this.scrollWidth - this.clientWidth);
          this.lastX = event.targetTouches[0].pageX;
      });
      elem.addEventListener('touchmove', function(event){
          if (event.targetTouches.length > 0) {
            var left = (event.targetTouches[0].pageX > this.lastX), 
                right = !left;

            this.lastX = event.targetTouches[0].pageX;

            if ((left && this.allowLeft) || (right && this.allowRight)) {
              event.stopPropagation();
            } else {
                event.preventDefault();
            }         
          }
      });
    }

    render() {

        return ( 
          <div style={styles.photoSuggestions} className="smoothScroller" ref={this.safariScrollerHorizontal}> 
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

