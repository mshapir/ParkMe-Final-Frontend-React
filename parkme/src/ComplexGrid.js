import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 300,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  price: {
    textAlign: 'right'
  },
  gridItem: {
    padding: '5px'
  }
});

function ComplexGrid(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
        {props.listings.map(listing => (
          <div className={classes.gridItem}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={listing.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={4} sm container>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {listing.title}
                  </Typography>
                  <Typography gutterBottom>{listing.description}</Typography>
                  <Typography color="textSecondary">{listing.location}</Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ cursor: 'pointer' }}>Book</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className={classes.price} variant="subtitle1">${listing.price}</Typography>
              </Grid>
            </Grid>
          </div>
        ))}
        </Grid>
      </Paper>
    </div>
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);
