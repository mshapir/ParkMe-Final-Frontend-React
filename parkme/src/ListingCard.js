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
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './styles/listingCardstyling'


class ListingCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  bookListing = (event, listing) => {
    console.log(event, listing);
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ display: 'inline-flex', paddingLeft: '25px' }}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="ParkMe Listing" className={classes.avatar} src={require("./logo.png")} />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.listing.title}
          subheader={this.props.listing.location}
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
          <IconButton aria-label="Book" onClick={() => this.bookListing(this.props.listing)}>
            <TimeToLeaveIcon />
          </IconButton>
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
            <Typography paragraph>
              {this.props.listing.description}
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
