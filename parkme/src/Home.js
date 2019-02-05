import React from 'react'
import ListingCont from './ListingCont'

class Home extends React.Component {
  render() {
    return (<div><ListingCont listings={this.props.listings}/></div>)
  }
}

export default Home;
