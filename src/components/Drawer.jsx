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
import { Typography, Collapse } from '@material-ui/core'
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
import LanguageIcon from '@material-ui/icons/Language'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { withTranslation } from 'react-i18next'

import PatreonIcon from './PatreonIcon.jsx'

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
      lastfmAuthConsent: false,
      languageOpened: false
    }
    this.handleProfileClick = this.handleProfileClick.bind(this)
    this.handleLoginDialogClose = this.handleLoginDialogClose.bind(this)
    this.handleLastfmDialogClose = this.handleLastfmDialogClose.bind(this)
    this.openPopUp = this.openPopUp.bind(this)
    this.logOut = this.logOut.bind(this)
    this.handleLanguageToggle = this.handleLanguageToggle.bind(this)
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

  handleLanguageToggle () {
    console.log(this)
    this.setState({
      languageOpened: !this.state.languageOpened
    })
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
          localStorage.removeItem('token')
          localStorage.removeItem('profile')
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
          localStorage.removeItem('token')
          localStorage.removeItem('profile')
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
    const { t } = this.props

    let dialogText
    switch (this.state.dialogStatus) {
      case 'ERROR':
        dialogText = t('translations:drawer.dialog.error')
        break
      case 'LOADING':
        dialogText = t('translations:drawer.dialog.loading')
        break
      case 'SUCCESS':
        dialogText = t('translations:drawer.dialog.success')
        break
      case 'ERROR_POPUP':
        dialogText = t('translations:drawer.dialog.errorPopup')
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
              <ListItemText primary={t('translations:drawer.error')}/>
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
                primary={this.state.account ? this.state.account.name : t('translations:drawer.login')}
                secondary={this.state.account ? '@' + this.state.account.user : null}/>
            </ListItem>
            {this.state.account ? (
              <List component="div" disablePadding>
                <div>
                  <Link to="/schedules" className="routerLink">
                    <ListItem button>
                      <ListItemIcon><Icon>today</Icon></ListItemIcon>
                      <ListItemText primary={t('translations:drawer.schedules')}/>
                    </ListItem>
                  </Link>
                  <ListItem button onClick={this.logOut}>
                    <ListItemIcon><Icon color="error">input</Icon></ListItemIcon>
                    <ListItemText primary={
                      <Typography color="error">{t('translations:drawer.logOut')}</Typography>
                    }/>
                  </ListItem>
                </div>
              </List>
            ) : ''}
          </List>
        ) : (
          <List>
            <ListItem button>
              <ListItemIcon>
                <CircularProgress color="primary"/>
              </ListItemIcon>
              <ListItemText primary={t('translations:drawer.loading')}/>
            </ListItem>
          </List>
        )}
        <Divider/>
        <List>
          <Link to="/" className="routerLink">
            <ListItem button>
              <ListItemIcon><Icon>home</Icon></ListItemIcon>
              <ListItemText primary={t('translations:drawer.home')}/>
            </ListItem>
          </Link>
          <Link to="/generate" className="routerLink">
            <ListItem button>
              <ListItemIcon><Icon>image</Icon></ListItemIcon>
              <ListItemText primary={t('translations:drawer.generator')}/>
            </ListItem>
          </Link>
          <Divider/>

          <ListItem
            target="_blank"
            rel="noreferrer nofollow"
            button
            component="a"
            href="https://patreon.com/musicorumapp" style={{ backgroundColor: 'rgba(255, 66, 77, 0.1)' }}>
            <ListItemIcon>
              <PatreonIcon style={{ color: '#FF424D' }}/>
            </ListItemIcon>
            <ListItemText primary={<span style={{ color: '#FF424D' }}>
              Patreon
            </span>}/>
          </ListItem>

          <ListItem target="_blank" rel="noreferrer nofollow" button component="a" href="https://twitter.com/MusicorumApp">
            <ListItemIcon><TwitterIcon/></ListItemIcon>
            <ListItemText primary='Twitter'/>
          </ListItem>
          <ListItem target="_blank" rel="noreferrer nofollow" button component="a" href="https://medium.com/musicorum">
            <ListItemIcon><Icon>create</Icon></ListItemIcon>
            <ListItemText primary='Blog'/>
          </ListItem>
          <ListItem target="_blank" rel="noreferrer nofollow" button component="a" href="https://github.com/musicorum-app">
            <ListItemIcon><GitHubIcon/></ListItemIcon>
            <ListItemText primary='Github'/>
          </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem button onClick={this.handleLanguageToggle}>
            <ListItemIcon>
              <LanguageIcon/>
            </ListItemIcon>
            <ListItemText primary={t('translations:common.language')}/>
            {this.state.languageOpened ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={this.state.languageOpened} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => this.props.i18n.changeLanguage('en')}>
                <ListItemText primary="English"/>
              </ListItem>
              <ListItem button onClick={() => this.props.i18n.changeLanguage('pt')}>
                <ListItemText primary="Português"/>
              </ListItem>
              <ListItem button onClick={() => this.props.i18n.changeLanguage('ru')}>
                <ListItemText primary="Русский"/>
              </ListItem>
              <ListItem button onClick={() => this.props.i18n.changeLanguage('ua')}>
                <ListItemText primary="Українська"/>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Dialog
          open={this.state.twitterAuthDialogOpened}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleLoginDialogClose}
          aria-labelledby="auth-dialog-title"
          aria-describedby="auth-dialog-description"
        >
          <DialogTitle id="auth-dialog-title">{t('translations:drawer.dialog.title')}</DialogTitle>
          <DialogContent style={{ textAlign: 'center' }}>
            <DialogContentText id="auth-dialog-description">
              {dialogText}
            </DialogContentText>
            <br/>
            {this.state.dialogStatus === 'LOADING' ? (<CircularProgress/>) : null}
          </DialogContent>
          <DialogActions>
            {this.state.dialogStatus === 'ERROR' || this.state.dialogStatus === 'SUCCESS' ? (
              <Button onClick={this.openPopUp} color="primary">
                {t('translations:drawer.dialog.tryAgain')}
              </Button>
            ) : null}
            <Button onClick={this.handleLoginDialogClose} color="primary">
              {t('translations:drawer.dialog.cancel')}
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
          <DialogTitle id="auth-dialog-title">{t('translations:drawer.lastfmDialog.title')}</DialogTitle>
          <DialogContent style={{ textAlign: 'center' }}>
            <DialogContentText id="auth-dialog-description">
              {t('translations:drawer.lastfmDialog.text')}
            </DialogContentText>
            <br/>
            <Link to="/account?lastfmConnect=true" className="routerLink">
              <Button variant="contained" onClick={this.handleLastfmDialogClose} color="primary">
                {t('translations:drawer.lastfmDialog.connect')}
              </Button>
            </Link>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleLastfmDialogClose} color="secondary">
              {t('translations:drawer.lastfmDialog.cancel')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
  }
}

export default withRouter(withTranslation()(Drawer))
