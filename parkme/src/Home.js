import React from 'react'
import ListingCont from './ListingCont'
import Loading from './Loading'

class Home extends React.Component {

  render() {
    if (this.props.user.id) {
      return (
        <div>
        <h2> All Listings </h2>
        <ListingCont listings={this.props.listings} user={this.props.user} updateReservations={this.props.updateReservations}/>
        </div>)
    }else {
      return (<Loading />)
    }
  }
}

export default Home;
