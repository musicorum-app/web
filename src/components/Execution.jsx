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
import { Dialog } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'

import { TwitterTweetEmbed } from 'react-twitter-embed'
import moment from 'moment'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

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
  },
  image: {
    height: '100%',
    width: '100%'
  }
}))

const successIcon = <DoneIcon/>
const errorIcon = <ErrorIcon/>

// eslint-disable-next-line react/display-name
const Execution = forwardRef((props, ref) => {
  const classes = useStyles()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState(null)
  const [dialogData, setDialogData] = useState(null)

  const execution = props.data

  const handleTweetDialog = () => {
    setDialogOpen(true)
    setDialogType('TWEET')
    setDialogData(execution.tweetId)
  }

  const handleImageDialog = () => {
    setDialogOpen(true)
    setDialogType('IMAGE')
    setDialogData(execution.image)
  }

  const openInNewWindow = () => {
    window.open(execution.image, '_blank')
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  let duration
  if (execution.startTime) {
    duration = (execution.endTime - execution.startTime) / 1000
  }

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
              {/* TODO: use moment on server-side */}
              <Grid item><Typography color="textSecondary">{execution.startTime ? moment(Number(execution.startTime)).format('lll') : '-'}</Typography></Grid>
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
      {execution.status === 'SUCCESS' ? (
        <CardActions>
          <Button onClick={handleTweetDialog} className={classes.buttons} color="secondary">
            SEE TWEET
          </Button>
          <Button onClick={handleImageDialog} className={classes.buttons} color="secondary">
            SEE IMAGE
          </Button>
        </CardActions>
      ) : null}
    </Card>

    <Dialog
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      maxWidth='md'
      fullWidth={dialogType === 'IMAGE'}
      onClose={handleCloseDialog}
    >
      <DialogTitle>{dialogType === 'TWEET' ? 'Execution tweet' : 'Execution Image'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogType === 'TWEET' ? (
            <TwitterTweetEmbed
              tweetId={dialogData}
            />
          ) : (
            <Fragment>
              <img src={dialogData} className={classes.image} />
            </Fragment>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {dialogType === 'IMAGE' ? (
          <Button onClick={openInNewWindow} color="secondary">
            Open in a new window
          </Button>
        ) : null}
        <Button onClick={handleCloseDialog} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </Fragment>
})
export default Execution
