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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HighlightOff from '@material-ui/icons/HighlightOff';
import ReviewModal from './ReviewModal';

const styles = theme => ({
  card: {
    maxWidth: 400,
    maxHeight: 600,
    minWidth: 400,
    minHeight: 400,
    padding: '10px',
    margin: '10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class ReservationCard extends React.Component {
  state = {
    expanded: false,
    reviewModal: false
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleModal = () => {
    this.setState({reviewModal: !this.state.reviewModal})
  };

  deletReservation = (reservation) => {
    console.log(reservation.id);
    let token = localStorage.getItem("token")
    fetch(`http://localhost:3001/api/v1/reservations/${reservation.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      this.props.deleteReservation(reservation)
    })
  }



  render() {
    const { classes } = this.props;

    return (
      <div style={{ display: 'inline-flex', paddingLeft: '25px' }}>
      {this.state.reviewModal  ? <ReviewModal reviewModal={this.handleModal} listing={this.props.reservation.listing} user={this.props.user} updateReviews={this.props.updateReviews}/> : ''}
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="ParkMe Reservation" className={classes.avatar} src={require("./logo.png")} />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.reservation.listing.title}
          subheader={`${this.props.reservation.listing.location} - $${this.props.reservation.listing.price}`}
        />
        <CardMedia
          className={classes.media}
          image={this.props.reservation.listing.image}
          title={this.props.reservation.listing.title}
        />
        <CardContent>
          <Typography component="p">
            {this.props.reservation.listing.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.handleModal}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={() => this.deletReservation(this.props.reservation)}>
            <HighlightOff />
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
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              {this.props.reservation.listing.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      </div>
    );
  }
}

ReservationCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReservationCard);
