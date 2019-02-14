import React, { Component } from 'react';

class Reviews extends Component {

  render() {
    return (
      <div>
      Comment: {this.props.review.comment} <br/>
      Rating: {this.props.review.rating}
      </div>
    );
  }

}

export default Reviews;
