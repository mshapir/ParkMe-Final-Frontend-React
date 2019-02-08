import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';
import { DayPickerRangeController } from 'react-dates';
import { withStyles } from '@material-ui/core/styles';
import 'react-dates/lib/css/_datepicker.css';

const styles = {
    dialogPaper: {
        minHeight: '100vh',
        maxHeight: '100vh',
    },
};

class BookListingButton extends React.Component {
  state = {
    open: false,
    startDate: null,
    endDate: null,
    focusedInput: 'startDate'
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
      alert(`Congrats, you booked ${listing.title} from ${this.state.startDate.format("MM-DD-YYYY")} to ${this.state.endDate.format("MM-DD-YYYY")}`)
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
          fullWidth={true}
          maxWidth={'xs'}
          classes={{ paper: this.props.dialogPaper }}
        >
          <DialogTitle id="form-dialog-title">Book Parking Spot: {this.props.listing.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.listing.description}
            </DialogContentText>
            <br />
            <DayPickerRangeController
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.bool
              onFocusChange={({ focusedInput }) => {console.log(focusedInput); this.setState({ focusedInput: focusedInput || 'startDate' })}} // PropTypes.func.isRequired
              numberOfMonths={1}
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

BookListingButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookListingButton);
