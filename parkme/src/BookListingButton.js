import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';

export default class BookListingButton extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
    })
  };

  render() {
    return (
      <div>
        <IconButton aria-label="Book" onClick={this.handleOpen}>
          <TimeToLeaveIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Book Parking Spot: {this.props.listing.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.listing.description}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Date"
              type="date"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.bookListing(this.props.listing)} color="primary">
              Book
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
