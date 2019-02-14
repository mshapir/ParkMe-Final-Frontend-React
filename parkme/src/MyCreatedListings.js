import React, { Component } from 'react';
import MyCreatedListingCard from './MyCreatedListingCard';

class MyCreatedListings extends Component {

  render() {
    return (
      <div>
      <h2> My Created Listings </h2>
      <div>
      {this.props.myListings.map(listing => {
        return <MyCreatedListingCard key={listing.id} listing={listing} updateMyListings={this.props.updateMyListings}/>
      })}
      </div>
      </div>
    );
  }

}

export default MyCreatedListings;
