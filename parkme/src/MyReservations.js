import React, { Component } from 'react';
import ReservationCard from './ReservationCard'

class MyReservations extends Component {

  render() {
    return (
      <div>
      <h2> My Reserved Parking Spots </h2>
      <div>{this.props.reservations.map(reservation => {
        return <ReservationCard key={reservation.id} reservation={reservation} deleteReservation={this.props.deleteReservation}/>
      })}</div>
      </div>
    );
  }

}

export default MyReservations;
