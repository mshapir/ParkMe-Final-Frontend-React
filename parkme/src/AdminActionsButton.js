import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class AdminActionsButton extends React.Component {
  state = {
    expanded: false,
    anchorEl: null,
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    editedTitle: null,
    editedDescription: null,
    editedLocation: null
  };

  handleExpandClick = (event) => {
    event.persist();
    this.setState(state => ({ expanded: !this.state.expanded, anchorEl: event.currentTarget }));
  };

  handleClose = () => {
    this.setState({ anchorEl: null, expanded: !this.state.expanded });
  };

  handleDialogClose = () => {
    this.setState({ isEditDialogOpen: false, isDeleteDialogOpen: false });
  };

  openDialog = (event, action) => {
    console.log('action: ', action);
    switch(action) {
      case 'edit': this.setState({ isEditDialogOpen: !this.state.isEditDialogOpen });
      case 'delete': this.setState({ isDeleteDialogOpen: !this.state.isDeleteDialogOpen });
      default: return this.handleClose();
    }
    this.handleClose();
  };

  handleListingChange = (event, action, listing) => {
    switch(action) {
      case 'edit': return; // add API call to edit here and add callback to ListingCard to render new info
      case 'delete': return; // add API call to delete here and add callback to ListingCard to hide the card
      default: return;
    }
  };

  handleFormChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const open = Boolean(this.state.anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleExpandClick}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.expanded}
          onClose={this.handleClose}
        >
          <MenuItem onClick={(event, action = 'edit') => this.openDialog(event, action)}>Edit</MenuItem>
          <MenuItem onClick={(event, action = 'delete') => this.openDialog(event, action)}>Delete</MenuItem>
        </Menu>

        <Dialog
          open={this.state.isEditDialogOpen || this.state.isDeleteDialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth={'xs'}
          // classes={{ paper: this.props.dialogPaper }}
        >
          <DialogTitle id="form-dialog-title">{this.state.isEditDialogOpen ? 'Edit Listing' : 'Delete Listing'}</DialogTitle>
          <DialogContent>
          {this.state.isEditDialogOpen ?
            <div>
              <TextField
                  id="standard-required"
                  label="Title"
                  className={this.props.textField}
                  value={this.props.listing.title}
                  onChange={this.handleFormChange('editedTitle')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                    id="standard-required-location"
                    label="Location"
                    className={this.props.textField}
                    value={this.props.listing.location}
                    onChange={this.handleFormChange('editedLocation')}
                    margin="normal"
                    fullWidth
                  />
              <TextField
                  id="standard-multiline-flexible"
                  label="Description"
                  multiline
                  rowsMax="4"
                  value={this.props.listing.description}
                  onChange={this.handleFormChange('editedDescription')}
                  className={this.props.textField}
                  margin="normal"
                  fullWidth
                />
              </div>
          :
            <DialogContentText>
              Are you sure you want to delete the listing titled {this.props.listing.title}?
            </DialogContentText>
          }
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={(event, action = this.state.isEditDialogOpen ? 'edit' : 'delete') => this.handleListingChange(event, action, this.props.listing)} color="primary">
              {this.state.isEditDialogOpen ? 'Edit' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

AdminActionsButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminActionsButton);
