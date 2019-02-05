import React from 'react'
import ListingCard from './ListingCard.js'

class ListingCont extends React.Component {
  render() {
    return (<div>{this.props.listings.map((listing) => {
      console.log(listing)
      return <ListingCard key={listing.id} listing={listing}/>
    })}</div>)
  }
}

export default ListingCont;
