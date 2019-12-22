import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import qs from 'query-string'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import MusicorumAPI from '../api/main'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2)
  },
  avatarGrid: {
    paddingRight: theme.spacing(2)
  },
  loading: {
    textAlign: 'center'
  }
}))

// eslint-disable-next-line react/display-name
const AccountPage = forwardRef((props, ref) => {
  const classes = useStyles()

  useImperativeHandle(ref, () => ({
    onLoad
  }))

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [dialogOpened, setDialogOpened] = useState(false)
  const [dialogStatus, setDialogStatus] = useState(null)

  useEffect(() => {
    setLoading(true)
    setProfile(null)
    // eslint-disable-next-line no-undef
    const profile = JSON.parse(localStorage.getItem('profile'))
    onLoad(profile)
    // eslint-disable-next-line no-undef
  }, [])

  const onLoad = data => {
    console.info('ONLOAD METHOD')
    console.log(data)
    setProfile(data)
    setLoading(false)
    console.log(data)
  }

  const openLastfmPopUp = () => {
    setDialogOpened(true)
    setDialogStatus('LOADING')
    MusicorumAPI.getLastfmAuthURL().then(res => {
      setDialogStatus('SUCCESS')
      const popUpWindow = window.open(res.data.url, 'Musicorum Lastfm Authentication', 'width=600,height=800')
      if (!popUpWindow) {
        setDialogStatus('ERROR_POPUP')
      }
    }).catch(e => {
      setDialogStatus('ERROR')
    })
  }

  const handleLoginDialogClose = () => {
    setDialogOpened(false)
  }

  let dialogText

  switch (dialogStatus) {
    case 'ERROR':
      dialogText = 'An error ocorrured while getting your login URL. Please try again.'
      break
    case 'LOADING':
      dialogText = 'Preparing your login...'
      break
    case 'SUCCESS':
      dialogText = 'A pop-up window has opened for you to login. If not, please enable your pop-ups and try again.'
      break
    case 'ERROR_POPUP':
      dialogText = 'We couldn\'t open the pop-up window for your login. Please allow pop-ups on your browser configuration.'
  }

  return (
    <div>
      <h1>My account</h1>
      <br/>
      <Paper className={classes.paper}>
        {
          loading ? (
            <Box className={classes.loading}>
              <CircularProgress/>
            </Box>
          ) : profile ? (
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <Grid container>
                  <Grid item className={classes.avatarGrid}>
                    <Avatar
                      src={profile.twitter.profilePicture}
                      draggable={false}
                      className="bigAvatar twitter"
                    />
                  </Grid>
                  <Grid item>
                    <Typography component="h5" variant="h5">
                      {profile.twitter.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      @{profile.twitter.user}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {
                profile.lastfm ? (
                  <Grid item xs={12} sm={12} md={6}>
                    <Grid container>
                      <Grid item className={classes.avatarGrid}>
                        <Avatar
                          src={profile.lastfm.profilePicture}
                          draggable={false}
                          className="bigAvatar lastfm"
                        />
                      </Grid>
                      <Grid item>
                        <Typography component="h5" variant="h5">
                          {profile.lastfm.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          @{profile.lastfm.user}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <React.Fragment>
                    <Grid item>
                      <Button onClick={openLastfmPopUp} variant="contained" color="secondary">
                        Connect to last.fm
                      </Button>
                    </Grid>
                  </React.Fragment>
                )
              }
            </Grid>
          ) : (
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              Please, log in to access this page.
            </div>
          )
        }
      </Paper>
      <Dialog
        open={dialogOpened}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLoginDialogClose}
        aria-labelledby="auth-dialog-title"
        aria-describedby="auth-dialog-description"
      >
        <DialogTitle id="auth-dialog-title">Log in into your Last.fm Account</DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogContentText id="auth-dialog-description">
            {dialogText}
          </DialogContentText>
          <br/>
          {dialogStatus === 'LOADING' ? (<CircularProgress/>) : null}
        </DialogContent>
        <DialogActions>
          {dialogStatus === 'ERROR' || dialogStatus === 'SUCCESS' ? (
            <Button onClick={openLastfmPopUp} color="primary">
              Try again
            </Button>
          ) : null}
          <Button onClick={handleLoginDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
})

export default AccountPage
