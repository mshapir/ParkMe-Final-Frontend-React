import React from 'react'
import { Card } from 'semantic-ui-react'

const src = '/images/wireframe/image.png'

const ListingGrid = (props) => (
  <Card.Group itemsPerRow={6}>
  {props.listings.map(listing => (
    <Card raised image={listing.image} />
  ))}
  </Card.Group>
)

export default ListingGrid;
