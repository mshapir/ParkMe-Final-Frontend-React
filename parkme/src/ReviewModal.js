import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class ReviewModal extends React.Component {
  state = {
    open: true,
    comment: '',
    rating: 5,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitReview = () => {
    let token = localStorage.getItem("token")
    fetch('http://localhost:3001/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `${token}`
      },
      body: JSON.stringify({
        rating: this.state.rating,
        comment: this.state.comment,
        listing_id: this.props.listing.id,
        user_id: this.props.user.id
      })
    })
    .then(r => r.json())
    .then(() => {
      alert('Thank you! Review Submitted!')
      this.props.updateReviews()
    })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.props.reviewModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Submit Review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Rate and Review ${this.props.listing.title}!`}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              name='comment'
              value={this.state.comment}
              label="Comment"
              type="textarea"
              onChange={this.handleChange}
              fullWidth
            />
            <select value={this.state.rating} onChange={this.handleChange} name='rating'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.reviewModal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitReview} color="primary">
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ReviewModal;
