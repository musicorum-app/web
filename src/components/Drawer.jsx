/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import Collapse from '@material-ui/core/Collapse'
import Slide from '@material-ui/core/Slide'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

export default class Drawer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profileOpened: false,
      loaded: false,
      authError: false,
      account: null,
      twitterAuthDialogOpened: false,
      dialogStatus: 'LOADING'
    }
    this.handleProfileClick = this.handleProfileClick.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.openPopUp = this.openPopUp.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  handleProfileClick () {
    if (this.state.account) {
      this.setState({
        profileOpened: !this.state.profileOpened
      })
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

  handleDialogClose () {
    this.setState({
      twitterAuthDialogOpened: false
    })
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
    } else {
      MusicorumAPI.getAuthStatus(token).then(res => {
        const account = res.data.twitter
        this.setState({
          loaded: true,
          account
        })
      }).catch(e => {
        if (e.response.status === 401) {
          this.setState({
            loaded: true,
            account: null
          })
          localStorage.removeItem('token')
        } else {
          this.setState({
            loaded: true,
            authError: true
          })
        }
      })
    }
  }

  logOut () {
    localStorage.removeItem('token')
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
        dialogText = "We couldn't open the pop-up window for your login. Please allow pop-ups on your browser configuration."
    }
    return (
      <div>
        <Divider/>
        {this.state.loaded ? this.state.authError ? (
          <List>
            <ListItem button>
              <ListItemIcon>
                <Icon color="error">error</Icon>
              </ListItemIcon>
              <ListItemText primary='An error ocorrured.'/>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem button={this.state.loaded} onClick={this.handleProfileClick}>
              <ListItemAvatar>
                {this.state.account ? (
                  <Avatar alt={this.state.account.user} src={this.state.account.profilePicture}/>
                ) : (
                  <Avatar><Icon>account_circle</Icon></Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={this.state.account ? this.state.account.name : 'Log in with Twitter'}
                secondary={this.state.account ? '@' + this.state.account.user : null}/>
              {this.state.account ? this.state.profileOpened ? <ExpandLess/> : <ExpandMore/> : null}
            </ListItem>
            {this.state.account ? (
              <Collapse in={this.state.profileOpened} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <div>
                    <Link to="/account" className="routerLink">
                      <ListItem button>
                        <ListItemIcon><Icon>account_circle</Icon></ListItemIcon>
                        <ListItemText primary='My account'/>
                      </ListItem>
                    </Link>
                    <Link to="/schedules" className="routerLink">
                      <ListItem button>
                        <ListItemIcon><Icon>today</Icon></ListItemIcon>
                        <ListItemText primary='Schedulers'/>
                      </ListItem>
                    </Link>
                    <ListItem button onClick={this.logOut}>
                      <ListItemIcon><Icon color="error">input</Icon></ListItemIcon>
                      <ListItemText primary={
                        <Typography color="error">Log out</Typography>
                      }/>
                    </ListItem>
                  </div>
                </List>
              </Collapse>
            ) : ''}
          </List>
        ) : (
          <List>
            <ListItem button>
              <ListItemIcon>
                <CircularProgress color="secondary"/>
              </ListItemIcon>
              <ListItemText primary='Loading...'/>
            </ListItem>
          </List>
        )}
        <Divider/>
        <List>
          <Link to="/" className="routerLink">
            <ListItem button>
              <ListItemIcon><Icon>home</Icon></ListItemIcon>
              <ListItemText primary='Home'/>
            </ListItem>
          </Link>
          <Link to="/generate" className="routerLink">
            <ListItem button>
              <ListItemIcon><Icon>image</Icon></ListItemIcon>
              <ListItemText primary='Image Generator'/>
            </ListItem>
          </Link>
        </List>

        <Dialog
          open={this.state.twitterAuthDialogOpened}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleDialogClose}
          aria-labelledby="auth-dialog-title"
          aria-describedby="auth-dialog-description"
        >
          <DialogTitle id="auth-dialog-title">Log in into your Twitter Account</DialogTitle>
          <DialogContent style={{ textAlign: 'center' }}>
            <DialogContentText id="auth-dialog-description">
              { dialogText }
            </DialogContentText>
            <br/>
            {this.state.dialogStatus === 'LOADING' ? (<CircularProgress/>) : null}
          </DialogContent>
          <DialogActions>
            {this.state.dialogStatus === 'ERROR' || this.state.dialogStatus === 'SUCCESS' ? (
              <Button onClick={this.openPopUp} color="primary">
                Try again
              </Button>
            ) : null}
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
  }
}
