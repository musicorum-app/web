/* eslint-disable react/prop-types */
import React, { forwardRef, useState, Fragment } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import CardActions from '@material-ui/core/CardActions'

import AccessTimeIcon from '@material-ui/icons/AccessTime'
import EventIcon from '@material-ui/icons/Event'
import DoneIcon from '@material-ui/icons/Done'
import ErrorIcon from '@material-ui/icons/Error'

// eslint-disable-next-line react/display-name

const useStyles = makeStyles(theme => ({
  buttons: {
    marginLeft: 'auto'
  },
  smol: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    fontWeight: 400,
    textDecoration: 'none'
  },
  icon: {
    display: 'inline-flex',
    VerticalAlign: 'text-bottom',
    BoxSizing: 'inherit',
    textAlign: 'center',
    AlignItems: 'center'
  },
  successChip: {
    backgroundColor: theme.palette.success.main
  }
}))

const successIcon = <DoneIcon/>
const errorIcon = <ErrorIcon/>

// eslint-disable-next-line react/display-name
const Execution = forwardRef((props, ref) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = event => {
    setAnchorEl(null)
  }

  const execution = props.data

  let duration
  if (execution.startTime) {
    duration = (execution.endTime - execution.startTime) / 1000
  }

  console.log(execution.endTime, execution.startTime)
  console.log((execution.endTime - execution.startTime) / 1000)

  return <Fragment>
    <Card variant="outlined">
      <CardContent>
        <Chip className={execution.status === 'SUCCESS' ? classes.successChip : null} label={execution.status}
              color="primary" size="small" icon={execution.status === 'SUCCESS' ? successIcon : errorIcon}/>
        <p></p>
        <Grid container spacing={1}>
          <Grid item xs={6} md={4}>
            <Grid container spacing={1} direction="row" alignItems="center">
              <Grid item><EventIcon className={classes.icon} fontSize="small"/></Grid>
              <Grid item><Typography color="textSecondary">{execution.startTime || '-'}</Typography></Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4}>
            <Grid container spacing={1} direction="row" alignItems="center">
              <Grid item><AccessTimeIcon className={classes.icon} fontSize="small"/></Grid>
              <Grid item><Typography color="textSecondary">{duration ? duration + 's' : '-'}</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
        <p></p>
        <Typography>{execution.message}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleMenuOpen} className={classes.buttons} color="secondary">
          SEE TWEET
        </Button>
        <Button onClick={handleMenuOpen} className={classes.buttons} color="secondary">
          SEE IMAGE
        </Button>
      </CardActions>
    </Card>
  </Fragment>
})
export default Execution
