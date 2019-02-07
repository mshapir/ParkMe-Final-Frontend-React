const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    maxWidth: 300,
    margin: 'auto',
    paddingTop: '20px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250

  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  submit: {
    float: 'right',
    marginTop: '10px'
  }
});

export default styles;
