import React from 'react'
import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2)
  },
  avatarGrid: {
    paddingRight: theme.spacing(2)
  }
}))

export default function AccountPage () {
  const classes = useStyles()

  return (
    <div>
      <h1>My account</h1>
      <br />
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={12} lg={6}>
            <Grid container>
              <Grid item className={classes.avatarGrid}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://pbs.twimg.com/profile_images/1180694084983443456/AMW9k7BR.jpg"
                  draggable={false}
                  className="bigAvatar twitter"
                />
              </Grid>
              <Grid item>
                <Typography component="h5" variant="h5">
                  metehus
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  @frommytwinks
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            B
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
