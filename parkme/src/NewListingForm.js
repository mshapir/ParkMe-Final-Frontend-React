import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles/newListingFormStyling'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography';



const locations = [
  {
    value: 'Brooklyn',
    label: 'Brooklyn',
  },
  {
    value: 'Queens',
    label: 'Queens',
  },
  {
    value: 'Manhattan',
    label: 'Manhattan',
  },
  {
    value: 'Bronx',
    label: 'Bronx',
  },
];

class NewListingForm extends React.Component {
  state = {
    title: '',
    image: '',
    description: '',
    location: '',
    price: 0,

  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleNewListing = (event) => {
    event.preventDefault()
    let token = localStorage.getItem("token")
    fetch('http://localhost:3001/api/v1/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        title: this.state.title,
        image: this.state.image,
        description: this.state.description,
        location: this.state.location,
        price: this.state.price,
        user_id: this.props.user.id
      })
    })
    .then(r => r.json())
    .then(data => {
      alert(`Created ${data.title}`)
      this.props.updateListings(data)
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
      <form noValidate autoComplete="off">
      <Typography component="h4" variant="h3">
      Create a new listing!
      </Typography>
        <TextField
          id="outlined-title"
          label="Title"
          name="title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        {"\n"}
        <TextField
          id="outlined-title"
          label="Image Url"
          name="image"
          className={classes.textField}
          value={this.state.image}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        {"\n"}
        <TextField
          id="outlined-textarea"
          label="Description"
          name="description"
          multiline
          className={classes.textField}
          value={this.state.description}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        {"\n"}
        <TextField
          id="outlined-number"
          label="Price"
          value={this.state.price}
          name="price"
          onChange={this.handleChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        {"\n"}
        <TextField
          id="outlined-select-currency"
          select
          label="Loaction"
          name="location"
          className={classes.textField}
          value={this.state.location}
          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your location"
          margin="normal"
          variant="outlined"
        >
          {locations.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {"\n"}
        <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        className={classes.submit}
        onClick={this.handleNewListing}>
          Create
        </Button>

      </form>
      </div>
    );
  }
}

NewListingForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewListingForm);
