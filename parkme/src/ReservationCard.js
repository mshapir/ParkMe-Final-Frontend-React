import React, { Component } from 'react';

class ReservationCard extends Component {

  render() {
    return (
      <div>{this.props.reservation.listing.title}</div>
    );
  }

}

export default ReservationCard;
