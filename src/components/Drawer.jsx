/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Icon from '@material-ui/core/Icon'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import MusicorumAPI from '../api/main'
import Slide from '@material-ui/core/Slide'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

class Drawer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profileOpened: false,
      loaded: false,
      authError: false,
      account: null,
      twitterAuthDialogOpened: false,
      dialogStatus: 'LOADING',
      lastfmAuthConsent: false
    }
    this.handleProfileClick = this.handleProfileClick.bind(this)
    this.handleLoginDialogClose = this.handleLoginDialogClose.bind(this)
    this.handleLastfmDialogClose = this.handleLastfmDialogClose.bind(this)
    this.openPopUp = this.openPopUp.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  handleProfileClick () {
    if (this.state.account) {
      this.props.history.push('/account')
    } else {
      this.setState({
        twitterAuthDialogOpened: true
      })
      this.openPopUp()
    }
  }

  openPopUp () {
    this.setState({
      dialogStatus: 'LOADING'
    })

    MusicorumAPI.getTwitterAuthURL().then(res => {
      this.setState({
        dialogStatus: 'SUCCESS'
      })
      localStorage.setItem('twitterAuthTokenId', res.data.tokenId)
      const popUpWindow = window.open(res.data.url, 'Musicorum Twitter Authentication', 'width=600,height=800')
      if (!popUpWindow) {
        this.setState({
          dialogStatus: 'ERROR_POPUP'
        })
      }
    }).catch(e => {
      this.setState({
        dialogStatus: 'ERROR'
      })
    })
  }

  handleLoginDialogClose () {
    this.setState({
      twitterAuthDialogOpened: false
    })
  }

  handleLastfmDialogClose () {
    this.setState({
      lastfmAuthConsent: false
    })
    localStorage.setItem('lastfmAuthConsent', false)
  }

  componentDidMount () {
    this.checkAuth()
  }

  checkAuth () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.setState({
        loaded: true,
        account: null
      })
      localStorage.removeItem('token')
      localStorage.removeItem('profile')
      this.props.onLoad(null)
    } else {
      const profile = localStorage.getItem('profile')
      let full = false
      if (profile) {
        const profileObj = JSON.parse(profile)
        if ((new Date() - profileObj.cacheDate) > 432000000) full = true
        if (!profileObj.lastfm) full = true
      } else {
        full = true
      }

      MusicorumAPI.getAuthStatus(token, full).then(res => {
        if (full) {
          const profileObj = {
            cacheDate: new Date().getTime(),
            id: res.data.id,
            twitter: res.data.twitter,
            lastfm: res.data.lastfm
          }
          localStorage.setItem('profile', JSON.stringify(profileObj))
          this.props.onLoad(profileObj)
          this.setState({
            loaded: true,
            account: {
              user: res.data.twitter.user,
              name: res.data.twitter.name,
              profilePicture: res.data.twitter.profilePicture
            }
          })
          this.doLastfmAuthConsent(profileObj)
        } else {
          const profileObj = JSON.parse(profile)
          this.setState({
            loaded: true,
            account: {
              user: profileObj.twitter.user,
              name: profileObj.twitter.name,
              profilePicture: profileObj.twitter.profilePicture
            }
          })
          this.props.onLoad(profileObj)
          this.doLastfmAuthConsent(profileObj)
        }
      }).catch(e => {
        if (!e.response) {
          console.error(e)
          this.setState({
            loaded: true,
            authError: true
          })
          return
        }
        if (e.response.status === 401) {
          this.setState({
            loaded: true,
            account: null
          })
          localStorage.removeItem('token')
          localStorage.removeItem('profile')
        } else {
          this.setState({
            loaded: true,
            authError: true
          })
        }
        this.props.onLoad(null)
      })
    }
  }

  doLastfmAuthConsent (profileObj) {
    if (profileObj.lastfm) return
    const consent = localStorage.getItem('lastfmAuthConsent')
    if (!consent) {
      this.setState({
        lastfmAuthConsent: true
      })
    }
  }

  logOut () {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    window.location.reload()
  }

  render () {
    let dialogText
    switch (this.state.dialogStatus) {
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
        <Divider />
        {this.state.loaded ? this.state.authError ? (
          <List>
            <ListItem button>
              <ListItemIcon>
                <Icon color="error">error</Icon>
              </ListItemIcon>
              <ListItemText primary='An error ocorrured.' />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem button={this.state.loaded} onClick={this.handleProfileClick}>
              <ListItemAvatar>
                {this.state.account ? (
                  <Avatar alt={this.state.account.user} src={this.state.account.profilePicture} />
                ) : (
                  <Avatar><Icon>account_circle</Icon></Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={this.state.account ? this.state.account.name : 'Log in with Twitter'}
                secondary={this.state.account ? '@' + this.state.account.user : null} />
            </ListItem>
            {this.state.account ? (
              <List component="div" disablePadding>
                <div>
                  <Link to="/schedules" className="routerLink">
                    <ListItem button>
                      <ListItemIcon><Icon>today</Icon></ListItemIcon>
                      <ListItemText primary='Schedules' />
                    </ListItem>
                  </Link>
                  <ListItem button onClick={this.logOut}>
                    <ListItemIcon><Icon color="error">input</Icon></ListItemIcon>
                    <ListItemText primary={
                      <Typography color="error">Log out</Typography>
                    } />
                  </ListItem>
                </div>
              </List>
            ) : ''}
          </List>
        ) : (
          <List>
            <ListItem button>
              <ListItemIcon>
                <CircularProgress color="primary" />
              </ListItemIcon>
              <ListItemText primary='Loading...' />
            </ListItem>
          </List>
        )}
        <Divider />
        <List>
          <Link to="/" className="routerLink">
            <ListItem button>
              <ListItemIcon><Icon>home</Icon></ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Link to="/generate" className="routerLink">
            <ListItem button>
              <ListItemIcon><Icon>image</Icon></ListItemIcon>
              <ListItemText primary='Image Generator' />
            </ListItem>
          </Link>
          <Divider />
          <ListItem button component="a" href="https://medium.com/musicorum">
            <ListItemIcon><Icon>create</Icon></ListItemIcon>
            <ListItemText primary='Blog' />
          </ListItem>
          <ListItem button component="a" href="https://twitter.com/MusicorumApp">
            <ListItemIcon><TwitterIcon /></ListItemIcon>
            <ListItemText primary='Twitter' />
          </ListItem>
          <ListItem button component="a" href="https://github.com/musicorum-app">
            <ListItemIcon><GitHubIcon /></ListItemIcon>
            <ListItemText primary='Github' />
          </ListItem>
        </List>
        <Dialog
          open={this.state.twitterAuthDialogOpened}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleLoginDialogClose}
          aria-labelledby="auth-dialog-title"
          aria-describedby="auth-dialog-description"
        >
          <DialogTitle id="auth-dialog-title">Log in into your Twitter Account</DialogTitle>
          <DialogContent style={{ textAlign: 'center' }}>
            <DialogContentText id="auth-dialog-description">
              {dialogText}
            </DialogContentText>
            <br />
            {this.state.dialogStatus === 'LOADING' ? (<CircularProgress />) : null}
          </DialogContent>
          <DialogActions>
            {this.state.dialogStatus === 'ERROR' || this.state.dialogStatus === 'SUCCESS' ? (
              <Button onClick={this.openPopUp} color="primary">
                Try again
              </Button>
            ) : null}
            <Button onClick={this.handleLoginDialogClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.lastfmAuthConsent}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleLastfmDialogClose}
          aria-labelledby="auth-dialog-title"
          aria-describedby="auth-dialog-description"
        >
          <DialogTitle id="auth-dialog-title">Connect to your Last.fm account</DialogTitle>
          <DialogContent style={{ textAlign: 'center' }}>
            <DialogContentText id="auth-dialog-description">
              We noticed that your account isn&apos;t connected to a Last.fm account, do you want to connect it now?
            </DialogContentText>
            <br />
            <Link to="/account?lastfmConnect=true" className="routerLink">
              <Button variant="contained" onClick={this.handleLastfmDialogClose} color="primary">
                Connect to Last.fm
              </Button>
            </Link>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleLastfmDialogClose} color="secondary">
              No, thanks
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
  }
}

export default withRouter(Drawer)
