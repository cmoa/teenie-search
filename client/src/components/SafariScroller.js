import React, {Component}
from 'react';
import { connect } from 'react-redux'

class SafariScroller extends Component {

    constructor(props) {
      super(props)
      this.safariScroller = React.createRef();
    }

    componentDidMount() {
      // Following code prevents safari from freezing up the scroll for 3 sec. scroll bug
      var elem = this.safariScroller.current;
      elem.addEventListener('touchstart', function(event){
          this.allowUp = (this.scrollTop > 0);
          this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
          this.prevTop = null; 
          this.prevBot = null;
          this.lastY = event.targetTouches[0].pageY;
      });
      elem.addEventListener('touchmove', function(event){
          if (event.targetTouches.length > 0) {
            var up = (event.targetTouches[0].pageY > this.lastY), 
                down = !up;

            this.lastY = event.targetTouches[0].pageY;

            if ((up && this.allowUp) || (down && this.allowDown)) 
                event.stopPropagation();
            else 
                event.preventDefault();                
          }
      });
    }

    scrollToTop() {
      var elem = this.safariScroller.current;
      elem.scrollTop = 0;
    }

    render() {

      return ( 
      	<div 
          className="smoothScroller"
          ref={this.safariScroller}
          onScroll={this.props.handleScroll ? () => this.props.handleScroll(this.safariScroller) : null}
          style={{
            position: 'fixed',
            overflow:'scroll', 
            height:this.props.scrollHeight, 
            width:this.props.scrollWidth,
            WebkitOverflowScrolling:'touch'
          }} >
          { this.props.children }
        </div>
      )
    }
}

export default SafariScroller;

