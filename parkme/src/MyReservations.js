import React, { Component } from 'react';
import ReservationCard from './ReservationCard'

class MyReservations extends Component {

  render() {
    console.log(this.props.reservations);
    return (
      <div>{this.props.reservations.map(reservation => {
        return <ReservationCard reservation={reservation}/>
      })}</div>
    );
  }

}

export default MyReservations;
