import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  }
}))

export default function TopsTheme () {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          select
          id="outlined-select-currency"
          label="Period"
          // helperText="Please select the period"
          className={classes.form}
          variant="outlined"
        >
          <MenuItem value="7day">7 days</MenuItem>
          <MenuItem value="1month">1 month</MenuItem>
          <MenuItem value="3month">3 month</MenuItem>
          <MenuItem value="6month">6 month</MenuItem>
          <MenuItem value="1year">1 year</MenuItem>
          <MenuItem value="overall">Overall</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          required
          id="outlined-basic"
          label="Title"
          variant="outlined"
          defaultValue="my month on music"
          // helperText="Please type in your Last.fm username"
          className={classes.form}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          required
          id="outlined-basic"
          label="Scrobbles subtext"
          variant="outlined"
          defaultValue="SCROBBLES THIS MONTH"
          // helperText="Please type in your Last.fm username"
          className={classes.form}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={6}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                Module #1
              </Typography>
            </Grid>
            <br/>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <TextField
                    required
                    select
                    label="Type"
                    className={classes.form}
                    variant="outlined"
                  >
                    <MenuItem value="artists">Top artists</MenuItem>
                    <MenuItem value="albums">Top albums</MenuItem>
                    <MenuItem value="tracks">Top tracks</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} xl={6}>
                  <TextField
                    required
                    id="outlined-basic"
                    label="Text"
                    variant="outlined"
                    defaultValue="TOP ALBUM"
                    // helperText="Please type in your Last.fm username"
                    className={classes.form}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6" color="primary">
              Module #2
            </Typography>
            <br/>
            <Grid container spacing={3}>
              <Grid item xs={12} xl={6}>
                <TextField
                  required
                  select
                  label="Type"
                  className={classes.form}
                  variant="outlined"
                >
                  <MenuItem value="artists">Top artists</MenuItem>
                  <MenuItem value="albums">Top albums</MenuItem>
                  <MenuItem value="tracks">Top tracks</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} xl={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Text"
                  variant="outlined"
                  defaultValue="TOP ALBUM"
                  // helperText="Please type in your Last.fm username"
                  className={classes.form}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
