import React from 'react'
import ListingCard from './ListingCard.js'

class ListingCont extends React.Component {
  render() {
    return (<div>{this.props.listings.map((listing) => {
      return this.props.listings.length > 1 ? <ListingCard key={listing.id} listing={listing} user={this.props.user} updateReservations={this.props.updateReservations}/> : []
    })}</div>)
  }
}

export default ListingCont;
