/* eslint-disable react/prop-types */
import React, { forwardRef, useState, Fragment } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import AccessTimeIcon from '@material-ui/icons/AccessTime'
import DateRangeIcon from '@material-ui/icons/DateRange'
import ListIcon from '@material-ui/icons/List'
import DeleteIcon from '@material-ui/icons/Delete'

import { Link } from 'react-router-dom'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
  }
}))

const getTime = minutes => {
  const hour = Math.floor(minutes / 60)
  const minute = minutes - (60 * hour)
  return {
    hour,
    minute
  }
}

const convertTime = t => {
  const hour = t.getHours() % 12 || 12
  const ampm = t.getHours() < 12 ? 'AM' : 'PM'
  return `${hour}:${t.getMinutes() < 10 ? t.getMinutes() + '0' : t.getMinutes()} ${ampm}`
}

// eslint-disable-next-line react/display-name
const Schedule = forwardRef((props, ref) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = event => {
    setAnchorEl(null)
  }

  const schedule = props.data
  const { id, name, text, time, schedule: scheduleType, timezone, runs, day } = schedule
  const { hour, minute } = getTime(time)

  return <Fragment>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h4">
          {name}
        </Typography>
        <p></p>
        <Grid container spacing={1}>
          <Grid item xs={6} md={4}>
            <Grid container spacing={1} direction="row" alignItems="center">
              <Grid item><DateRangeIcon className={classes.icon} fontSize="small" /></Grid>
              <Grid item><Typography color="textSecondary">{scheduleType.toUpperCase()} {
                scheduleType === 'WEEKLY' ? `(${weekDays[day]})` : null}</Typography></Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4}>
            <Grid container spacing={1} direction="row" alignItems="center">
              <Grid item><ListIcon className={classes.icon} fontSize="small" /></Grid>
              <Grid item>
                <Typography color="textSecondary">
                  {runs} executions
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={1} direction="row" alignItems="center">
              <Grid item><AccessTimeIcon className={classes.icon} fontSize="small" /></Grid>
              <Grid item>
                <Typography color="textSecondary">
                  {convertTime(new Date(`1/1/2000 ${hour}:${minute}`))}
                  <span className={classes.smol}>  ({timezone})</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <p></p>
        <Divider />
        <p></p>
        <Box color="secondary.main">Tweet text:</Box>
        {text
          ? (<Typography>{text}</Typography>)
          : (<i>None</i>)}
        <p></p>
      </CardContent>
      <CardActions>
        <Link className="routerLink" to={'/schedules/' + id + '/history'}>
          <IconButton aria-label="History" className={classes.buttons} color="secondary">
            <Icon>history</Icon>
          </IconButton>
        </Link>
        <IconButton aria-label="Settings" onClick={handleMenuOpen} className={classes.buttons} color="secondary">
          <Icon>settings</Icon>
        </IconButton>
      </CardActions>
    </Card>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={!!anchorEl}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { handleMenuClose(); props.onDelete(schedule) }}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Delete</Typography>
      </MenuItem>
    </Menu>
  </Fragment>
})
export default Schedule
