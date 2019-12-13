import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  }
}))

export default function Generator () {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={8} sm={4}>
        <TextField
          required
          select
          id="outlined-select-currency"
          label="Type"
          helperText="Please select the type"
          className={classes.form}
          variant="outlined"
        >
          <MenuItem value="artists">Top artists</MenuItem>
          <MenuItem value="albums">Top albums</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={4} sm={4}>
        <TextField
          required
          select
          id="outlined-select-currency"
          label="Grid Size"
          helperText="Please select the grid size"
          className={classes.form}
          variant="outlined"
        >
          <MenuItem value="3">3x3</MenuItem>
          <MenuItem value="4">4x4</MenuItem>
          <MenuItem value="5">5x5</MenuItem>
          <MenuItem value="6">6x6</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          required
          select
          id="outlined-select-currency"
          label="Period"
          helperText="Please select the period"
          className={classes.form}
          variant="outlined"
        >
          <MenuItem value="7day">7 days</MenuItem>
          <MenuItem value="1month">1 month</MenuItem>
          <MenuItem value="3month">3 month</MenuItem>
          <MenuItem value="6month">6 month</MenuItem>
          <MenuItem value="1year">1 year</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  )
}
