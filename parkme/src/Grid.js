import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListingCard from './listingCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function NestedGrid(props) {
  const { classes } = props;

  const listingRows = () => {
    const listings = [];
    let row = [];
    props.listings.map((listing, index) => {
      row.push(listing);
      if (index !== 0 && index % 3 === 0) {
        listings.push(row);
        row = [];
      }
    });
    return listings;
  }

  console.log(listingRows);

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
      {listingRows().map((listingRow, index) => (
        <Grid container item xs={12} spacing={24}>
        {listingRow.map((listing, index) => (
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <ListingCard className={classes.paper} key={listing.id} listing={listing}/>
            </Paper>
          </Grid>
        ))}
        </Grid>
      ))}
      </Grid>
    </div>
  );
}

NestedGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGrid);


// <Grid container spacing={8}>
// {props.listings.map((listing, index) => (
  // index % 3 === 0 ? <Grid container item xs={12} spacing={24}> : ''
  //   <Grid item xs={4}>
  //     <Paper className={classes.paper}>
  //       <ListingCard className={classes.paper} key={listing.id} listing={listing}/>
  //     </Paper>
  //   </Grid>
  // {index % 3 === 0 ? </Grid> : ''}
//   ))}
// </Grid>
