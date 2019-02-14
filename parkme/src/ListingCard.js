import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BookListingButton from './BookListingButton';
import AdminActionsButton from './AdminActionsButton';
import Reviews from './Reviews';
import styles from './styles/listingCardstyling';

class ListingCard extends React.Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


  bookListing = (listing) => {
    let token = localStorage.getItem("token")
    fetch('http://localhost:3001/api/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        listing_id: listing.id,
        user_id: this.props.user.id
      })
    })
    .then(r => r.json())
    .then(data => {
      alert(`You Booked ${listing.title}`)
      this.props.updateReservations(data)
    })
  };


  render() {
    const { classes } = this.props;
    console.log(this.props.listing);
    return (
      <div style={{ display: 'inline-flex', paddingLeft: '25px' }}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="ParkMe Listing" className={classes.avatar} src={require("./logo.png")} />
          }
          action={
            <AdminActionsButton listing={this.props.listing} />
          }
          title={this.props.listing.title}
          subheader={`${this.props.listing.location} - $${this.props.listing.price}`}
        />
        <CardMedia
          className={classes.media}
          image={this.props.listing.image}
          title={this.props.listing.title}
        />
        <CardContent>
          <Typography component="p">
            {this.props.listing.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <BookListingButton listing={this.props.listing} />
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Reviews</Typography>
            <Typography paragraph>
               {this.props.listing.reviews.map(review => {
                 return <Reviews key={review.id} review={review} />
               })}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      </div>
    );
  }
}

ListingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListingCard);


// {this.props.listing.reviews.map(review => review.comment )}
// <br />
// {this.props.listing.reviews.map(review => review.rating )}
