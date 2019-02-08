import React from 'react'
import ListingCont from './ListingCont'
import Loading from './Loading'

class Home extends React.Component {

  render() {
    if (!this.props.user.id) {
      return (<div><ListingCont listings={this.props.listings} user={this.props.user}/></div>)
    }else {
      return (<Loading />)
    }
  }
}

export default Home;
